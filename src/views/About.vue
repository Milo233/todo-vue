<template>
    <div class="about">
        <div class="background">
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3360065279,1236835867&fm=26&gp=0.jpg" width="100%" height="100%" alt="" />
        </div>
        <div class="startFront">
            <p :style="{'color' : anonymous ? 'red' : 'green' }" @click="toggle()"
            style="margin: 0 0;height: 30px">
                <b v-show="anonymous">没有登录!</b>
                <b v-show="!anonymous">你好，xxx！</b>
                <img alt="今日诗词" src="https://v2.jinrishici.com/one.svg"/>
<!--                {{nowdate}}-->
                <br/>
            </p>

            <el-form ref="form" :model="form" label-width="80px" v-show="show">
                <el-form-item label="用户名" v-show="anonymous">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="密码" v-show="anonymous">
                    <el-input type="password" v-model="form.password"
                              @keyup.enter.native="onSubmit()"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit" v-show="anonymous">登录</el-button>
                    <el-button type="primary" @click="onOut">登出</el-button>
                </el-form-item>
            </el-form>

            <el-input v-model="keyword" style="width:200px;margin:0 20px 20px 20px;"
                      @keyup.enter.native="search('random')">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="warning" size="medium" round @click="clear()">clear</el-button><br>
            <el-button type="primary" size="medium" round @click="search('Bing')">Bing</el-button>
            <el-button type="primary" size="medium" round @click="search('Google')">Google</el-button>
            <el-button type="primary" size="medium" round @click="search('Baidu')">Baidu</el-button>
            <br/>

            <div v-for="link in tableData" :key="link.address" style="display: inline;">
                <el-button type="text" @click="goto(link.address)" style="margin-right: 14px">{{link.name}}</el-button>
            </div>

            <ol>
                <li v-for="todo in todos" :key="todo">
                    <a v-show="todo.url" :href="todo.url" target="_blank">
                        {{todo.title}} / {{todo.info}}
                    </a>
                    <p v-show="todo.url === ''">
                        {{todo.title}} / {{todo.info}}
                    </p>
                    {{todo.created_at | moment("YYYY-MM-DD h:mm:ss")}}
                    <b @click="deleteTodo(todo.id)" style="color:red;"> 刪除</b>
                </li>
            </ol>

        </div>
    </div>
</template>
<style>
    body{ text-align:center;margin: 0 0}
    .background{
        width:100%;
        height:100%;  /**宽高100%是为了图片铺满屏幕 */
        z-index:-1;
        position: absolute;
    }

    .startFront {
        z-index:1;
        text-align: center;
    }
</style>

<script>
    var urlMap = new Map();
    urlMap.set("Baidu","https://www.baidu.com/s?wd=")
    urlMap.set("Bing","https://cn.bing.com/search?q=")
    urlMap.set("Google","https://www.google.com/search?q=")

    import * as API from '@/api/todo/';

    export default {
        name: 'PostTodo',
        data() {
            return {
                anonymous: true,
                show: false,
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                keyword: "",
                nowdate: formatDate(new Date()),
                form: {
                    user_name: '',
                    password: '',
                },
                todos: []
            };
        },
        methods: {
            load () {
                API.me().then((res) => {
                    if (res.status === 0) {
                        this.anonymous = false;
                    }
                });
                API.getTodos(0, 100000).then((res) => {
                    this.todos = res.data.items;
                });
            },
            onSubmit() {
                API.login(this.form).then((res) => {
                    if (res.status > 0) {
                        this.$notify.error({
                            title: '登录失败',
                            message: res.msg,
                            type: 'error',
                        });
                    } else {
                        this.$notify({
                            title: '登录成功',
                            message: `enjoy!!!`,
                            type: 'success',
                        });
                        this.$router.push({ name: 'home', params: {} });
                    }
                }).catch((error) => {
                    this.$notify.error({
                        title: '网路错误，或者服务器宕机',
                        message: error,
                    });
                });
            },
            toggle(){
                this.show = !this.show;
            },
            clear(){
                this.keyword = ""
            },
            search(engine){
                let perfix = urlMap.get(engine);
                if (!perfix) { // random get one by key from map
                    let keys = Array.from(urlMap.keys());
                    perfix = urlMap.get(keys[Math.floor(Math.random() * keys.length)]) ;
                }

                if (this.keyword && this.keyword.trim() !== "") {
                    window.open(perfix + this.keyword,'_blank')
                }
            },
            goto(address){
                window.open(address,'_blank');
            },
            deleteTodo(id){
                if (confirm("are you sure to delete it?" + id)) {
                    API.deleteTodo(id).then(() => {
                        this.load()
                    });
                }
            },
            onOut(){
                API.logout().then((res) => {
                    if (res.status > 0) {
                        this.$notify.error({
                            title: '登出失败',
                            message: res.msg,
                            type: 'error',
                        });
                    } else {
                        this.$notify({
                            title: '登出成功',
                            message: `see you!!!`,
                            type: 'success',
                        });
                        window.location.reload()
                    }
                }).catch((error) => {
                    this.$notify.error({
                        title: '网路错误，或者服务器宕机',
                        message: error,
                    });
                });
            },
        },
        components: {
        },
        beforeMount() {
            this.load();
            setInterval(() =>{
                this.nowdate = formatDate(new Date())
            }, 1000)
        },
    };

    function formatDate(time,format='YY-MM-DD hh:mm:ss'){
        const date = new Date(time);

        const year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
            return '0' + index;
        });////开个长度为10的数组 格式为 00 01 02 03

        return format.replace(/YY/g, year)
            .replace(/MM/g, preArr[month] || month)
            .replace(/DD/g, preArr[day] || day)
            .replace(/hh/g, preArr[hour] || hour)
            .replace(/mm/g, preArr[min] || min)
            .replace(/ss/g, preArr[sec] || sec);
    }
</script>
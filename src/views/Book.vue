<template>
    <div class="about">
        <div class="front" style="padding: 8px 12px">
            <p v-html="current" style="height: 60%" @dblclick="readbook(1)"></p>
            <el-button type="primary" @click="readbook(-1)">上一页</el-button>
            <el-button type="primary" @click="readbook(1)">next page</el-button>
        </div>
    </div>
</template>
<style>
    body{ text-align:center;margin: 0 0}
    .front{
        z-index:1;
        text-align: center;
    }
</style>

<script>
    import * as API from '@/api/todo/';

    export default {
        name: 'PostTodo',
        data() {
            return {
                current:"",
                pageSize: 10,
                lastPageContent:"",
                nextPageContent:"",
                index:-1,
            };
        },
        methods: {
            readbook(diff){
                if (diff === -1) {
                    this.current = this.lastPageContent
                } else if (diff === 1){
                    this.current = this.nextPageContent
                } else {
                    diff = 0;
                }
                this.backtop();
                API.readbook("story2.txt", parseInt(diff)+parseInt(this.index), this.pageSize).then((res) => {
                    this.current = res.current
                    this.lastPageContent = res.lastPageContent
                    this.nextPageContent = res.nextPageContent
                    this.index = res.index
                });
            },
            backtop(){
                var timer = setInterval(function(){
                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let ispeed = Math.floor(-osTop / 5);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                    if(osTop === 0){
                        clearInterval(timer);
                    }
                },30)
            },
        },
        components: {
        },
        beforeMount() {
            this.readbook(-1);
        },
    };

</script>
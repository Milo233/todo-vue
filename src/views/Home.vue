<template>
    <div class="home">
        <div class="top">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :md="8" v-for="todo in todos" :key="todo.id">
                    <el-card class="video-card" @click.native="goTodo(todo)">
                        <img class="video-avatar" :src="todo.avatar">
                        <div>
                            <div class="video-title">{{todo.title}}</div>
                            <div class="video-bottom clearfix">
                                <span class="video-info">{{todo.info.substring(0, 40)}}</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="block">
                <!-- 分页组件  -->
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="6"
                        layout="total,sizes,prev, pager, next,jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from '@/api/todo/';
    export default {
        name: 'home',
        data() {
            return {
                todos: [],
                start: 0,
                limit: 10,
                total: 0,
            };
        }
        ,
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                this.load();
            },
            handleCurrentChange(val) {
                this.start = this.limit * (val - 1); // val 页面
                this.load();
            },
            load() {
                let start = Date.now();
                API.getTodos(this.start, this.limit).then((res) => {
                    this.todos = res.data.items;
                    this.total = res.data.total;
                    console.log(Date.now() - start)
                });
            },
            goTodo(todo) {  // 这里的todoId传给了 ShowTodo.vue, 不是直接传给了index.js
                this.$router.push({ name: 'showTodo', params: { todoId: todo.id } });
            },
        },
        components: {
        },
        beforeMount() {
            this.load();
        },
    };
</script>

<style>
</style>

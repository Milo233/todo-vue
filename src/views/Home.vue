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
<!--            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="6"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>-->
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
            load() {
                API.getTodos().then((res) => {
                    this.todos = res.data.items;
                    // this.total = res.data.total;
                });
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

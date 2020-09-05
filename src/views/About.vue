<template>
    <div class="about">
        <h1>欢迎来到Giligili</h1>
        <h2>欢迎投稿：</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.user_name"></el-input>
            </el-form-item>

            <el-form-item label="密码">
                <el-input type="textarea" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    import * as API from '@/api/todo/';

    export default {
        name: 'PostTodo',
        data() {
            return {
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    user_name: '',
                    password: '',
                },
            };
        },
        methods: {
            onSubmit() {
                API.login(this.form).then((res) => {
                    if (res.status > 0) {
                        this.$notify.error({
                            title: '投稿失败',
                            message: res.msg,
                        });
                    } else {
                        this.$notify({
                            title: '投稿成功',
                            message: `您投稿的ID为`,
                            type: 'success',
                        });
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
    };
</script>
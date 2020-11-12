<template>
    <div class="post-video">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item label="链接">
                <el-input type="url" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="通知">
                <el-switch v-model="form.notify"></el-switch>
            </el-form-item>
<!--            <el-form-item label="视频封面">
                <el-upload
                        class="avatar-uploader"
                        label="描述"
                        action=""
                        ref="upload"
                        :before-upload="fnBeforeUpload"
                        :http-request="fnUploadRequest"
                        :show-file-list="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">只能上传png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>

        <form ref="form" :model="file" >
                <input type="file" @change="getFile($event)">
                <button @click="submitForm($event)">提交</button>
        </form>
    </div>
</template>

<script>
    import * as API from '@/api/todo/';
    import axios from 'axios';

    export default {
        name: 'PostTodo',
        data() {
            return {
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    title: '',
                    info: '',
                    url: '',
                    // notify: false,
                },
                file:  null,
            };
        },
        methods: {
            getFile(event) {
                this.file = event.target.files[0];
            },
            submitForm(event) {
                event.preventDefault();
                let formData = new FormData();
                formData.append('uploadFile', this.file);
                axios.post('/api/v1/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (response) {
                    if (response.data.message !== "OK") {
                        alert("上传失败" + response.data.msg)
                    } else {
                        alert("上传成功");
                    }
                }).catch((error) => {
                    alert("网路错误，或者服务器宕机" + error)
                })
            },
            onSubmit() {
                API.postTodo(this.form).then((res) => {
                    if (res.status > 0) {
                        this.$notify.error({
                            title: '投稿失败',
                            message: res.msg,
                            position: 'bottom-right',
                        });
                    } else {
                        this.$notify({
                            title: '投稿成功',
                            message: `您投稿的ID为${res.data.id}`,
                            position: 'bottom-right',
                            type: 'success',
                        });
                    }
                }).catch((error) => {
                    this.$notify.error({
                        title: '网路错误，或者服务器宕机',
                        position: 'bottom-right',
                        message: error,
                    });
                });
            },
        },
        components: {
        },
    };
</script>

<style>
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
</style>

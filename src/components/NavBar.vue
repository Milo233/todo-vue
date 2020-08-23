<template>
    <el-menu class="top-bar" mode="horizontal" router>
        <el-menu-item index="/">home</el-menu-item>
        <el-menu-item index="/postTodo">新增待办</el-menu-item>
        <el-menu-item index="/about">about</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "NavBar",
    }
</script>

<style scoped>

</style>
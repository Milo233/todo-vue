<template>
    <el-menu class="top-bar" background-color="#E8E8E0"
             text-color="grey"   active-text-color="black"
             mode="horizontal" router>
        <el-menu-item index="/">todo</el-menu-item>
        <el-menu-item index="/postTodo">新增待办</el-menu-item>
        <el-menu-item index="/book">Book</el-menu-item>
        <el-menu-item index="/about">login/out</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "NavBar",
    }
</script>

<style scoped>
</style>
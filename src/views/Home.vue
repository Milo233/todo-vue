<template>
    <div class="home">
        i am home
    </div>
</template>

<script>
    // import * as API from '@/api/video/';
    export default {
        name: 'home',
        data() {
            return {
                videos: [],
                start: 0,
                limit: 6,
                total: 0,
            };
        }
        ,
        methods: {
        },
        components: {
        }
    };
</script>

<style>
</style>

<template>
    <div class="about" @click="pageTurn($event)">
        <el-button type="text" >{{index}}/{{total}} {{(index / total * 100).toFixed(0) }}%</el-button>
        <div class="front" style="padding: 8px 12px" >
            <p v-html="current" style="height: 60%" ></p>
            <el-input v-model="bookname" @change="changeBook"></el-input>
        </div>
    </div>
</template>
<style>
    body{ text-align:center;margin: 0 0}
    .front{
        z-index:1;
        text-align: left;
        line-height: 24px;
    }
</style>

<script>
    import * as API from '@/api/todo/';

    export default {
        name: 'PostTodo',
        data() {
            return {
                current:"",
                total: 0,
                pageSize: 10,
                lastPageContent:"",
                nextPageContent:"",
                index:-1,
                bookname: "story2.txt",
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
                this.backToTop();
                API.readbook(this.bookname, parseInt(diff)+parseInt(this.index), this.pageSize).then((res) => {
                    this.current = res.current
                    this.lastPageContent = res.lastPageContent
                    this.nextPageContent = res.nextPageContent
                    this.index = res.index
                    this.total = res.total
                });
            },
            pageTurn(event){ // 根据点击位置判断是向前还是向后翻页
                const screenWidth = document.body.clientWidth
                if (event.clientX < screenWidth / 3) {
                    this.readbook(-1)
                } else if (event.clientX > 2 * screenWidth / 3) {
                    this.readbook(1)
                }
            },
            changeBook(){
                this.index = -1; // reset
                this.readbook(0);
            },
            backToTop(){
                const timer = setInterval(function () {
                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let ispeed = Math.floor(-osTop / 3);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                    if (osTop === 0) {
                        clearInterval(timer);
                    }
                }, 30);
            },
        },
        components: {
        },
        beforeMount() {
            this.readbook(-1);
        },
    };

</script>
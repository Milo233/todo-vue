<template>
  <div class="post-todo">
    <div class="todo-header">
      <h2>{{todo.title}}</h2>
      <div class="todo-data">
        {{todo.created_at | moment("YYYY-MM-DD h:mm:ss") }} 创建 ·
<!--        {{todo.view}}观赏-->
      </div>
    </div>
<!--    <todo-player-->
<!--      class="todo-player-box"-->
<!--      :options="playerOptions">-->
<!--    </todo-player>-->
<!--    <div class="todo-info">-->
<!--      <pre>{{todo.info}}</pre>-->
<!--    </div>-->
  </div>
</template>

<script>
// import 'todo.js/dist/todo-js.css';
// import { todoPlayer } from 'vue-video-player';
import * as API from '@/api/todo/';

export default {
  name: 'ShowTodo',
  data() {
    return {
      todo: {},
      playerOptions: {
        fluid: true,
        autoplay: false,
        sources: [{
          type: 'todo/mp4',
          src: '',
        }],
      },
    };
  },
  methods: {
    load() {
      API.getTodo(this.$route.params.todoId).then((res) => {
        this.todo = res.data;
        // this.playerOptions.sources[0].src = this.todo.url;
      });
    },
  },
  components: {
    // todoPlayer,
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style>
.todo-header {
  margin-bottom: 16px;
}
.todo-header h2{
  margin-bottom: 0px;
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-data {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}
.todo-info {
  color: #111;
}
</style>

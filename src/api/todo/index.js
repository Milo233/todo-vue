import axios from 'axios';

// 创建视频
const postTodo = form => axios.post('/api/v1/todo', form).then(res => res.data);

// 读视频详情
// const getVideo = id => axios.get(`/api/v1/video/${id}`).then(res => res.data);
const getTodo = id => axios.get(`/api/v1/todo/${id}`).then(res => res.data);

// 读取视频列表
// const getTodos = () => axios.get('/api/v1/todos', { }).then(res => res.data);
const getTodos = (start, limit) => axios.get('/api/v1/todos', { params: { start, limit } }).then(res => res.data);

const login = form => axios.post('/api/v1/user/login', form).then(res => res.data);

export {
    login,
    getTodos,
    getTodo,
    postTodo,
};

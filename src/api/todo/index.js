import axios from 'axios';

// 创建视频
const postTodo = form => axios.post('/api/v1/todo', form).then(res => res.data);

// 读视频详情
const getTodo = id => axios.get(`/api/v1/todo/${id}`).then(res => res.data);

const deleteTodo = id => axios.delete(`/api/v1/todo/${id}`).then(res => res.data);

// 读取视频列表
// const getTodos = () => axios.get('/api/v1/todos', { }).then(res => res.data);
const getTodos = (start, limit) => axios.get('/api/v1/todos', { params: { start, limit } }).then(res => res.data);

const login = form => axios.post('/api/v1/user/login', form).then(res => res.data);

const logout = form => axios.delete('/api/v1/user/logout', form).then(res => res.data);

const me = form => axios.get('/api/v1/user/me', form).then(res => res.data);

const readbook = (bookname, index, pagesize, ) => axios.get('/api/v1/book/read', { params: { index, pagesize, bookname } }).then(res => res.data);

export {
    login,
    logout,
    me,
    getTodos,
    getTodo,
    postTodo,
    readbook,
    deleteTodo,
};

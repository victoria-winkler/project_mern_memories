import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//  before any post/get request this method sends JWT to backend
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//  POST ROUTES
export const fetchPosts = () => API.get('/posts'); //  needed to be changed because we have different routes that need to be accessed: /, /posts /user
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//  SIGNUP/IN ROUTES
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

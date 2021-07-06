import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
export const fetchPost = (id) => API.get(`/posts/${id}`);	
export const fetchPosts = ( page ) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
const temp_googlesignIn = (formData) => {
  return API.post('/user/googlesignin', formData);
}
const temp_signIn = (formData) => {
  return API.post('/user/signin', formData);
}
const temp_signUp = (formData) => {
  return API.post('/user/signup', formData);
}
export const googlesignIn = (formData) => temp_googlesignIn(formData);
export const signIn = (formData) => temp_signIn(formData);
export const signUp = (formData) => temp_signUp(formData);
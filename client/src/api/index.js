import axios from 'axios';
import qs from 'qs';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);	
export const fetchPostByUser = (id) => API.get(`/profile/${id}`);	
export const fetchPosts = ( page ) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const updateUser = (id,updatedUser) => axios({
                                                method: 'patch',
                                                url: `http://localhost:5000/account/${id}`,
                                                data: qs.stringify({
                                                  aboutMe: updatedUser.aboutMe,
                                                  imageUrl: updatedUser.imageUrl
                                                }),
                                                headers: {
                                                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                                                }
                                              });
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
export const getUserByID = (id) => API.get(`/account/${id}`);
import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, FETCH_POST_BY_USER, CREATE, UPDATE,UPDATE_USER, DELETE, LIKE, COMMENT, FETCH_USER_BY_ID } from '../constants/actionTypes';	
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {	
  try {	
    dispatch({ type: START_LOADING });	
    const { data } = await api.fetchPost(id);	
    dispatch({ type: FETCH_POST, payload: { post: data } });	
    dispatch({ type: END_LOADING });
  } catch (error) {	
    console.log(error);	
  }	
};

export const getUserByID = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserByID(id);
    dispatch({ type: FETCH_USER_BY_ID, payload: { creator: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUser = (id) => async (dispatch) => {	
  try {	
    dispatch({ type: START_LOADING });	
    const { data: { data } } = await api.fetchPostByUser(id);	
    dispatch({ type: FETCH_POST_BY_USER, payload: { data } });	
    dispatch({ type: END_LOADING });
  } catch (error) {	
    console.log(error);	
  }	
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = ( page ) => async (dispatch) => {
  try {	
    dispatch({ type: START_LOADING });	
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);	
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });	
    dispatch({ type: END_LOADING });	
  } catch (error) {	
    console.log(error);	
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {	
    dispatch({ type: START_LOADING });	
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);	
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });	
    dispatch({ type: END_LOADING });	
  } catch (error) {	
    console.log(error);	
  }
};

export const createPost = (post, history) => async (dispatch) => {	
  try {	
    dispatch({ type: START_LOADING });	
    const { data } = await api.createPost(post);	
    dispatch({ type: CREATE, payload: data });	
    history.push(`/posts/${data._id}`);	
  } catch (error) {	
    console.log(error);	
  }	
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: {...data,name: post?.name } });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, user);

    dispatch({ type: UPDATE_USER, data: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

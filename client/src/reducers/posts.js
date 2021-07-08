import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST_BY_USER, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, FETCH_USER_BY_ID,ERROR,UPDATE_USER } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [],creator: null,alert: null }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST_BY_USER:
      return { ...state, posts: action.payload.data };
    case FETCH_USER_BY_ID:
      return { ...state, creator: action.payload.creator };  
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case UPDATE_USER:
      return { ...state, creator: action.data}
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case ERROR:
      return { ...state,alert: action.alert };
    default:
      return state;
  }
};
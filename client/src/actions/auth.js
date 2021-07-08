import { AUTH,ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    dispatch({type: ERROR, alert: error.response.data});
  }
};

export const googlesignin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.googlesignIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    dispatch({type: ERROR, alert: error.response.data});
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
     dispatch({type: ERROR, alert: error.response.data});
  }
};

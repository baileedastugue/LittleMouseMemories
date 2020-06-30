import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';

import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     AUTH_ERROR,
     USER_LOADED,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT_SUCCESS,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
     if (localStorage.token) {
          setAuthToken(localStorage.token);
     }
     try {
          const res = await axios.get('/api/auth');
          dispatch({
               type: USER_LOADED,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: AUTH_ERROR,
          });
     }
};

// Register user
export const register = ({ firstName, lastName, email, password }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };
     const body = JSON.stringify({ firstName, lastName, email, password });
     try {
          const res = await axios.post('api/users', body, config);
          dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data,
          });
          dispatch(loadUser());
     } catch (err) {
          // const errors = err;
          console.log(err);
          // if (errors) {
          //      errors.forEach((error) =>
          //           dispatch(setAlert(error.msg, 'danger'))
          //      );
          // }
          dispatch({
               type: REGISTER_FAIL,
          });
     }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
          },
     };

     const body = JSON.stringify({ email, password });

     try {
          const res = await axios.post('/api/auth', body, config);
          dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data,
          });

          dispatch(loadUser());
     } catch (err) {
          const errors = err.response.data.errors;
          console.log(err);
          // dispatch(setAlert(err, 'danger'));
          if (errors) {
               errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
               );
          }
          dispatch({
               type: LOGIN_FAIL,
          });
     }
};

export const logout = () => (dispatch) => {
     dispatch({
          type: LOGOUT_SUCCESS,
     });
};

import axios from 'axios';
import { setAlert } from './alertActions';
import {
     GET_PROMPTS_SUCCESS,
     GET_PROMPTS_FAIL,
     ADD_PROMPT_SUCCESS,
     ADD_PROMPT_FAIL,
     DELETE_PROMPT_SUCCESS,
     DELETE_PROMPT_FAIL,
} from './types';

export const getPrompts = (album_id) => async (dispatch) => {
     try {
          const res = await axios.get(`/api/prompts/album/${album_id}`);
          dispatch({
               type: GET_PROMPTS_SUCCESS,
               payload: res.data,
          });
     } catch (err) {
          dispatch({
               type: GET_PROMPTS_FAIL,
               payload: {
                    msg: err.response.status.text,
                    status: err.response.status,
               },
          });
     }
};

export const addNewPrompt = (album_id, { prompt, response }) => async (
     dispatch
) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          },
     };
     const body = JSON.stringify({ prompt, response });
     try {
          const res = await axios.post(
               `/api/prompts/${album_id}`,
               body,
               config
          );
          dispatch({
               type: ADD_PROMPT_SUCCESS,
               payload: res.data,
          });
          dispatch(getPrompts(album_id));
     } catch (err) {
          const errors = err.response;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: ADD_PROMPT_FAIL,
          });
     }
};

export const deletePrompt = (prompt_id, album_id) => async (dispatch) => {
     const config = {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          },
     };
     try {
          const res = await axios.delete(`/api/prompts/${prompt_id}`, config);
          dispatch({
               type: DELETE_PROMPT_SUCCESS,
               payload: res.data,
          });
          dispatch(getPrompts(album_id));
     } catch (err) {
          const errors = err.response;
          if (errors) {
               for (let i = 0; i < errors.length; i++) {
                    dispatch(setAlert(errors[i].msg, 'danger'));
               }
          }
          dispatch({
               type: DELETE_PROMPT_FAIL,
          });
     }
};
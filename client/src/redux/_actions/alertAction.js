import{SET_ALERT,REMOVE_ALERT} from '../types'
import uuid from 'uuid/v4';

export const setAlert = (message, type, timeout = 3000) => dispatch => {
    const id = uuid();
    dispatch({type: SET_ALERT, payload: {message, type, id}});
    setTimeout(() => {
      dispatch({type: REMOVE_ALERT, payload: id})
    },timeout)
};

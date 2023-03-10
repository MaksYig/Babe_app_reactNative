import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'react-native-uuid';

export const setAlert = (title, type, msg) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: SET_ALERT, payload: { title, msg, type, id } });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

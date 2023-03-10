import { GET_PET_INFO } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PET_INFO:
      return { pet_info: action.payload };
    default:
      return state;
  }
};

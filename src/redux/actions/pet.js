import * as api from '../../API/index.js';
import {
  CREATE_PET,
  CREATE_PET_FAIL,
  GET_PET_INFO,
  PET_INFO_FAIL,
  UPDATE_PET_FAIL,
  UPDATE_PET,
  DELETE_PET_FAIL,
  DELETE_PET,
  USER_PROFILE,
} from './types';
import { Toast } from 'native-base';

export const createPet = (formData, token) => async (dispatch) => {
  try {
    const res = await api.createPet(formData, token);
    if (res.status === 201) {
      dispatch({ type: CREATE_PET, payload: res.data });
      Toast.show({
        title: 'Good news! ✅',
        placement: 'bottom',
        variant: 'solid',
        description: 'Your pet successfully created 👍',
        duration: 5000,
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_PET_FAIL,
      payload: err?.response?.data,
    });
    const error = err?.response?.data;
    if (error) {
    }
    console.log(error);
  }
};

export const updatePet = (id, formData, token) => async (dispatch) => {
  try {
    const res = await api.updatePet(id, formData, token);
    if (res.status === 200) {
      const profile = await api.getProfileInfo(res.data.data.owner, token);
      if (profile.status === 200) {
        dispatch({ type: USER_PROFILE, payload: profile.data });
        Toast.show({
          title: 'Good news! ✅',
          placement: 'bottom',
          variant: 'solid',
          description: 'Your pet info, successfully updated 👍',
          duration: 5000,
        });
      }
    }

    console.log(res);
  } catch (error) {}
};

export const getPetInfo = (id) => async (dispatch) => {
  try {
    const res = await api.getPetInfo(id);
    if (res.status === 200) {
      dispatch({ type: GET_PET_INFO, payload: res.data.data });
      console.log(res.data.data);
    }
  } catch (err) {}
};

export const deletPet = (id, token) => async (dispatch) => {
  try {
    const res = await api.deletePet(id, token);
    if (res.status === 200) {
      dispatch({ type: DELETE_PET, payload: res.data });
      const profile = await api.getProfileInfo(res.data.data.owner, token);
      if (profile.status === 200) {
        dispatch({ type: USER_PROFILE, payload: profile.data });
        Toast.show({
          title: 'Bad news ❌',
          placement: 'bottom',
          variant: 'solid',
          description: 'Your pet was deleted 😮  ',
          duration: 5000,
        });
      }
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const updateMedPetInfo = (id, formData, token) => async (dispatch) => {
  try {
    const res = await api.updateMedInfo(id, formData, token);
    if (res.status === 200) {
      console.log('Updated med Info');
      Toast.show({
        title: '✅ SUCCESSFULL ✅',
        placement: 'bottom',
        variant: 'solid',
        description: 'Medecine information was updated 👍',
        duration: 5000,
      });
    }
  } catch (err) {
    console.log(err.response);
  }
};

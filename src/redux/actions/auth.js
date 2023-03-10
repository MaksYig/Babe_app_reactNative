import * as api from '../../API/index.js';
import {
  ISUSER,
  NOUSER,
  USER_SIGNIN,
  USER_SIGNIN_FAIL,
  USER_PROFILE,
  USER_PROFILE_FAIL,
  USER_CREATED,
  USER_CREATED_FAIL,
  USER_UPDATED,
  USER_UPDATED_FAIL,
  SIGN_OUT,
} from './types';
import { AlertMsg } from '../../components/Alerts/Alert.js';
import { resolveStackStyleInput, Toast } from 'native-base';

export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.signin(formData);

    if (res.status === 200) {
      /*       console.log(res.data); */
      dispatch({ type: USER_SIGNIN, payload: res.data });
      const info = await api.getUserInfo(res.data?.auth_token);
      if (info.status === 200) {
        dispatch({ type: ISUSER, payload: info?.data });
        /*         console.log(info); */
        const prof = await api.getProfileInfo(
          info?.data?.id,
          res.data?.auth_token
        );
        if (prof.status === 200) {
          dispatch({ type: USER_PROFILE, payload: prof.data });
          Toast.show({
            title: 'Sign in Successfully 🎉👌',
            placement: 'bottom',
            variant: 'solid',
            description: 'Thanks for comming back',
            duration: 5000,
          });
        }
      }
    }
  } catch (err) {
    console.log(err?.response?.data);
    Toast.show({
      title: 'Someting went wrong ❌❗',
      placement: 'bottom',
      variant: 'solid',
      description: err?.response?.data?.non_field_errors,
      duration: 5000,
    });
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    const res = await api.getUserInfo(token);

    if (res.status === 200) {
      dispatch({ type: ISUSER, payload: res?.data });
      console.log(res);
    }
  } catch (error) {
    dispatch({ type: NOUSER, payload: error.response?.data });
    console.log(error);
  }
};

export const getUserProfile = (id, token) => async (dispatch) => {
  try {
    const res = await api.getProfileInfo(id, token);
    if (res.status === 200) {
      dispatch({ type: USER_PROFILE, payload: res.data });
      console.log('Get User Profile');
    }
  } catch (error) {
    console.log('ERROR');
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const res = await api.signup(formData);
    if (res.status === 201) {
      dispatch({ type: USER_CREATED, payload: res?.data });
      console.log(`RES DATA: ${res.data}`);
      const sign = await api.signin(formData);
      if (sign.status == 200) {
        dispatch({ type: USER_SIGNIN, payload: sign.data });
        console.log(sign.data);
        const info = await api.getUserInfo(sign.data?.auth_token);
        if (info.status === 200) {
          dispatch({ type: ISUSER, payload: info.data });
          console.log(info.data);
          const prof = await api.getProfileInfo(
            info?.data?.id,
            sign.data?.auth_token
          );
          if (prof.status === 200) {
            dispatch({ type: USER_PROFILE, payload: prof.data });
            console.log(prof.data);
            Toast.show({
              title: 'User was created successfully 🎉👏',
              placement: 'bottom',
              variant: 'solid',
              description: 'Thank you for using out BABE APP',
              duration: 5000,
            });
          }
        }
      }
    }
  } catch (err) {
    const error = err.response.data;
    if (error.email) {
      Toast.show({
        title: 'Someting went wrong ❌❗',
        placement: 'bottom',
        variant: 'solid',
        description: error.email[0],
        duration: 5000,
      });
    }
    if (error.username) {
      Toast.show({
        title: 'Someting went wrong ❌❗',
        placement: 'bottom',
        variant: 'solid',
        description: error.username[0],
        duration: 5000,
      });
    }
    if (error.password) {
      error.password.map((msg) => {
        return Toast.show({
          title: 'Someting went wrong ❌❗',
          placement: 'bottom',
          variant: 'solid',
          description: msg,
          duration: 5000,
        });
      });
    }
    console.log(err.response.data);
  }
};

export const updateMe = (id, formData, token) => async (dispatch) => {
  try {
    const res = await api.updateMe(id, formData, token);
    console.log(res);
    if (res.status == 200) {
      dispatch({ type: USER_UPDATED, payload: res.data.data });
      const prof = await api.getProfileInfo(res.data.data.id, token);
      dispatch({ type: USER_PROFILE, payload: prof.data });
      Toast.show({
        title: '✅ SUCCESSFULLY ✅',
        placement: 'bottom',
        variant: 'solid',
        description: 'User profile successfully updated 🎉',
        duration: 5000,
      });
    }
  } catch (err) {
    const error = err.response;
    /*     dispatch({ type: USER_UPDATED_FAIL, payload: error.message }); */
    if (error) {
      console.log(err.response);
    }
  }
};

export const signout = (token) => async (dispatch) => {
  try {
    const res = await api.logout(token);
    console.log(res);
    if (res.status === 204) {
      dispatch({ type: SIGN_OUT, payload: res.data });
      console.log(res);
    }
  } catch (error) {
    dispatch({ type: NOUSER, payload: error.response?.data });
    console.log(error);
  }
};

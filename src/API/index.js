import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.1.3:8000/' });

const sourse = axios.CancelToken.source();

const headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
const config = {
  CancelToken: sourse.token,
};

export const getUserInfo = (token) =>
  API.get(`api-auth-djoser/users/me/`, {
    headers: { Authorization: 'Token '.concat(token) },
  });
export const getProfileInfo = (id, token) =>
  API.get(`api/profiles/${id}/`, {
    headers: {
      Authorization: 'Token '.concat(token),
      'Content-Type': 'multipart/form-data',
    },
  });

export const signin = (formData) =>
  API.post(`api-auth-djoser/token/login/`, formData);

export const signup = (formData) =>
  API.post(`api-auth-djoser/users/`, formData, config);

export const createPet = (formData, token) =>
  API.post('api/listings/create/', formData, {
    headers: {
      Authorization: 'Token '.concat(token),
      'Content-Type': 'multipart/form-data',
    },
  });

export const updatePet = (id, formData, token) =>
  API.patch(`api/listings/update/${id}/`, formData, {
    headers: {
      Authorization: 'Token '.concat(token),
      'Content-Type': 'multipart/form-data',
    },
  });

export const logout = (token) =>
  API.post(`api-auth-djoser/token/logout/`, token, {
    headers: { Authorization: 'Token '.concat(token) },
  });
export const deletePet = (id, token) =>
  API.delete(`api/listings/delete/${id}/`, {
    headers: { Authorization: 'Token '.concat(token) },
  });

export const updateMe = (id, formData, token) =>
  API.patch(`api/user/profile/${id}/`, formData, {
    headers: { Authorization: 'Token '.concat(token) },
  });

export const getPetInfo = (id) => API.get(`api/listings/info/${id}/`);

export const updateMedInfo = (id, formData, token) =>
  API.patch(`api/listings/medical/${id}/`, formData, token);

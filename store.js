import { configureStore } from '@reduxjs/toolkit';
import auth from './src/redux/reducers/auth.js';
import alerts from './src/redux/reducers/alerts.js';
import pet from './src/redux/reducers/pet.js';
export const store = configureStore({
  reducer: {
    user: auth,
    alerts: alerts,
    pet: pet,
  },
});

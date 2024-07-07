import { configureStore } from '@reduxjs/toolkit';
import authReducer from './ReduxSlices';

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default Store;

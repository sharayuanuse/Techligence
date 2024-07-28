import { configureStore } from '@reduxjs/toolkit';
import authReducer from './ReduxSlices';
import courseReducer from './CourseSlice';

const Store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export default Store;

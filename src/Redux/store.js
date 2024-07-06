import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';

// Configure Redux store with tasksReducer as the root reducer
const store = configureStore({
  reducer: {
    tasks: tasksReducer, // tasksReducer handles state related to tasks
  },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

// Utility functions to load and save state from/to local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return []; // Return empty array if no saved state found
    }
    return JSON.parse(serializedState); // Parse and return saved state
  } catch (err) {
    return []; // Return empty array in case of errors
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state); // Serialize state to JSON
    localStorage.setItem('tasks', serializedState); // Save serialized state to local storage
  } catch (err) {
    // Ignore write errors
  }
};

// Initial state loaded from local storage
const initialState = loadState();

// Redux slice using createSlice from Redux Toolkit
const taskSlice = createSlice({
  name: 'tasks', // Slice name
  initialState, // Initial state loaded from local storage
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload); // Add new task to state
      saveState(state); // Save updated state to local storage
    },
    deleteTask: (state, action) => {
      const newState = state.filter(task => task.id !== action.payload); // Filter out task to delete
      saveState(newState); // Save updated state to local storage
      return newState; // Return new state after deletion
    },
    editTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id); // Find index of task to edit
      if (index !== -1) {
        state[index] = action.payload; // Update task at found index
        saveState(state); // Save updated state to local storage
      }
    },
  },
});

// Export actions and reducer from the created slice
export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer; // Export reducer function as default

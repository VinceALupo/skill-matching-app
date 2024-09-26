

// src/features/activitiesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState: [],
  reducers: {
    addActivity: (state, action) => {
      // Push the new activity to the state array
      state.push(action.payload);
    },
    editActivity: (state, action) => {
      const { index, activity } = action.payload;
      // Update the specific activity at the given index
      state[index] = activity;
    },
  },
});

export const { addActivity, editActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;



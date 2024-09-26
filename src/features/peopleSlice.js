
// src/features/peopleSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
  name: 'people',
  initialState: [],
  reducers: {
    addPerson: (state, action) => {
      // Push the new person to the state array
      state.push(action.payload);
    },
    editPerson: (state, action) => {
      const { index, person } = action.payload;
      // Update the specific person at the given index
      state[index] = person;
    },
  },
});

export const { addPerson, editPerson } = peopleSlice.actions;
export default peopleSlice.reducer;


 
import { createSlice } from '@reduxjs/toolkit';

const EditItems = createSlice({
  name: 'EditItems',
  initialState: {
    isEdit: false,
  },
  reducers: {
    toggleEditButton: (state) => {
      state.isEdit = !state.isEdit;
    },
  },
});

export default EditItems;
export const { setEditButtonOff, setEditButtonOn, toggleEditButton } =
EditItems.actions;
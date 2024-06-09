import { configureStore } from '@reduxjs/toolkit';
import EditItems from './features/EditItems';

const store = configureStore({
  reducer: {
    edItems: EditItems.reducer,
  },
});

export default store;

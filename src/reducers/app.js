import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setList(state, action) {
      state.list = action.payload
    }
  },
});

export const { setList } = appSlice.actions
export const selectList = (state) => state.app.list
export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    comment1: false,
    descrip: {},
    tags: [],
    search: "",
  },
  reducers: {
    comment1: (state) => {
      state.comment1 = !state.comment1;
    },
    descrip: (state, action) => {
      state.descrip = action.payload;
    },
    addtags: (state, action) => {
      state.tags = [...action.payload];
    },
    setsearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { comment1, descrip, addtags, setsearch } = generalSlice.actions;
export default generalSlice.reducer;

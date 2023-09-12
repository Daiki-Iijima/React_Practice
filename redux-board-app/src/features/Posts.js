import { createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../DummyData";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { value: PostsData },
  reducers: {
    addPost: (state, action) => {
      state.value.push(action.payload);
    },
    deletePost: (state, action) => {
      state.value = state.value.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;

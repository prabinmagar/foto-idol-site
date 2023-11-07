import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import postsService from "../services/postsService";

export const getAllPost = createAsyncThunk("posts/fetch/all", async(thunkAPI) => {
  try{
    return await postsService.getAllPost();
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSinglePost = createAsyncThunk("posts/fetch/single", async(postSlug, thunkAPI) => {
  try{
    return await postsService.getSinglePost(postSlug);
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createPost = createAsyncThunk('posts/create', async (postData, thunkAPI) => {
    try{
      return await postsService.createPost(postData);
    } catch(error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
});

export const getUserPosts = createAsyncThunk("posts/user/posts", async(_, thunkAPI) => {
  try{
    return await postsService.getUserPosts();
  } catch(error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

const initialState = {
  posts: [],
  post: {},
  assets: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  userPosts: [],
  sortedPosts: []
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(getSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload);
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.assets.push(action.payload);
        toast.success("Image uploaded successfully");
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userPosts.push(action.payload);
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload);
      })
  },
});

export const selectAllPosts = (state) => state.posts.posts.posts;
export const selectSinglePost = (state) => state.posts.post;
export const selectSortedPosts = (state) => state.posts.sortedPosts;
export const selectUserPosts = (state) => state.posts.userPosts;
export default postsSlice.reducer;

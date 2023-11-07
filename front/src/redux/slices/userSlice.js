import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { toast } from "react-toastify";

const initialState = {
    links: [],
    searchedUserLinks: {},
    isError: false,
    isSuccess: false,
    isLoading: false
}

export const getAllLinks = createAsyncThunk("user/link/fetch", async(_, thunkAPI) => {
    try{
        return await userService.getAllLinks();
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createLinks = createAsyncThunk("user/link/create", async(linksData, thunkAPI) => {
    try{
        return await userService.createLinks(linksData);
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteLink = createAsyncThunk("user/link/delete", async(linkId, thunkAPI) => {
    try{
        return await userService.deleteLink(linkId);
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateLink = createAsyncThunk("user/link/update", async(link, thunkAPI) => {
    try{
        return await userService.updateLink(link.linkData, link.linkId);
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const searchUserLinks = createAsyncThunk("user/link/search", async(userId, thunkAPI) => {
    try{
        return await userService.searchUserLinks(userId);
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllLinks.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllLinks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.links = action.payload
        })
        .addCase(getAllLinks.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.links = null;
            toast.error(action.payload)
        })
        .addCase(searchUserLinks.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(searchUserLinks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.searchedUserLinks = action.payload
        })
        .addCase(searchUserLinks.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.links = {};
            toast.error(action.payload)
        })
        .addCase(createLinks.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createLinks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.error(action.payload);
        })
        .addCase(createLinks.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            toast.error(action.payload)
        })
        .addCase(deleteLink.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteLink.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.error(action.payload);
        })
        .addCase(deleteLink.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            toast.error(action.payload)
        })
        .addCase(updateLink.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateLink.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.error(action.payload);
        })
        .addCase(updateLink.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            toast.error(action.payload)
        })
    }
});

export const selectAllLinks = (state => state.user.links);
export const selectSearchedUserLinks = (state => state.user.searchedUserLinks);
export default userSlice.reducer;
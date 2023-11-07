import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import settingService from "../../services/settings/settingService";

const initialState = {
  content: null,
  contents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createHomeSlider = createAsyncThunk("content/create", async (formdata, thunkAPI) => {
  try {
    return await settingService.createHomeSlider(formdata);
  } catch (error) {
    const message = error.response.data.error || error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllhomeSlider = createAsyncThunk("content/all", async (_, thunkAPI) => {
  try {
    return await settingService.getAllhomeSlider();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const gethomeSlider = createAsyncThunk("content/single", async (id, thunkAPI) => {
  try {
    return await settingService.gethomeSlider(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletehomeSlider = createAsyncThunk("content/delete", async (contentId, thunkAPI) => {
  try {
    return await settingService.deletehomeSlider(contentId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatehomeSlider = createAsyncThunk("content/update", async ({ id, formData }, thunkAPI) => {
  try {
    return await settingService.updatehomeSlider(id, formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const homeSliderslice = createSlice({
  name: "homeslider",
  initialState,
  reducers: {
    content_RESET(state) {
      state.content = false;
      state.contents = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHomeSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHomeSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.isSuccess = true;
        toast.success(action.payload);
      })
      .addCase(createHomeSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllhomeSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllhomeSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contents = action.payload;
      })
      .addCase(getAllhomeSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.contents = null;
        toast.error(action.payload);
      })
      .addCase(gethomeSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gethomeSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.content = action.payload;
      })
      .addCase(gethomeSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.content = null;
        toast.error(action.payload);
      })
      .addCase(deletehomeSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletehomeSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deletehomeSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updatehomeSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatehomeSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(updatehomeSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { content_RESET } = homeSliderslice.actions;
export const selectHomeSlider = (state) => state.homeslider.content;

export default homeSliderslice.reducer;

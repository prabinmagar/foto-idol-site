
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import aboutService from "../services/aboutService";

const initialState = {
  about: null,
  allAbout: [],
  isError: false,
  isSuccess: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isLoading: false,
  message: "",
  location: null,
  allLocation: [],
};

export const createAbout = createAsyncThunk(
  "about/create",
  async (formData, thunkAPI) => {
    try {
      return await aboutService.createAbout(formData);
    } catch (error) {
      const message = error.response.data.error || error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllAbout = createAsyncThunk(
  "about/all",
  async (_, thunkAPI) => {
    try {
      return await aboutService.getAllAbout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAbout = createAsyncThunk(
  "about/delete",
  async (aboutId, thunkAPI) => {
    try {
      return await aboutService.deleteAbout(aboutId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAbout = createAsyncThunk(
  "about/update",
  async (updateData, thunkAPI) => {
    try {
      return await aboutService.updateAbout(updateData.id, updateData.formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createLocation = createAsyncThunk(
  "about/location/create",
  async (formdata, thunkAPI) => {
    try {
      return await aboutService.createLocation(formdata);
    } catch (error) {
      const message = error.response.data.error || error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllLocation = createAsyncThunk(
  "about/location/all",
  async (_, thunkAPI) => {
    try {
      return await aboutService.getAllLocation();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete",
  async (deleteId, thunkAPI) => {
    try {
      return await aboutService.deleteLocation(deleteId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/update",
  async (updateData, thunkAPI) => {
    try {
      return await aboutService.updateLocation(updateData.id, updateData.formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.isCreateSuccess = true;
        toast.success(action.payload);
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isCreateSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allAbout = action.payload;
      })
      .addCase(getAllAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.allAbout = null;
        toast.error(action.payload);
      })
      .addCase(deleteAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
        state.isCreateSuccess = true;
        toast.success(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isCreateSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allLocation = action.payload;
      })
      .addCase(getAllLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.allLocation = null;
        toast.error(action.payload);
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const selectAllAbout = (state) => state.about.allAbout;
export const selectSingleAbout = (state) => state.about.about;
export const selectAllLocation = (state) => state.about.allLocation;
export const selectSingleLocation = (state) => state.about.location;
export const { ABOUT_RESET } = aboutSlice.actions;

export default aboutSlice.reducer;

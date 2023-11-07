import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import settingService from "../../services/settings/settingService";

const initialState = {
  postLimit: null,
  features: null,
  contactinfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  featuredCategories: null,
  message: "",
};

export const toggleHomeFeature = createAsyncThunk(
  "features/list",
  async (resourceId, thunkAPI) => {
    try {
      return await settingService.toggleHomeFeature(resourceId);
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
export const getFeaturesLists = createAsyncThunk(
  "features-get/list",
  async (_, thunkAPI) => {
    try {
      return await settingService.getFeaturesLists();
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
export const toggleCategoryFeature = createAsyncThunk(
  "features/category/list",
  async (resourceId, thunkAPI) => {
    try {
      return await settingService.toggleCategoryFeature(resourceId);
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
export const getFeaturedCategoriesLists = createAsyncThunk(
  "features-get/category/list",
  async (_, thunkAPI) => {
    try {
      return await settingService.getCategoryFeaturesLists();
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
export const createOrUpdateContactInfo = createAsyncThunk(
  "contact/list",
  async (formdata, thunkAPI) => {
    try {
      return await settingService.createOrUpdateContactInfo(formdata);
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
export const getContactInfo = createAsyncThunk(
  "contact-get/list",
  async (_, thunkAPI) => {
    try {
      return await settingService.getContactInfo();
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

export const addPostLimit = createAsyncThunk(
  "post-post/limit",
  async (formData, thunkAPI) => {
    try {
      return await settingService.addPostLimit(formData);
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
export const getPostLimit = createAsyncThunk(
  "post-get/limit",
  async (_, thunkAPI) => {
    try {
      return await settingService.getPostLimit();
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

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    SETTING_RESET(state) {
      state.features = false;
      state.contactinfo = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.postLimit = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleHomeFeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleHomeFeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(toggleHomeFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getFeaturedCategoriesLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedCategoriesLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.featuredCategories = action.payload;
      })
      .addCase(getFeaturedCategoriesLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.featuredCategories = null;
        toast.error(action.payload);
      })
      .addCase(toggleCategoryFeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleCategoryFeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(toggleCategoryFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getFeaturesLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturesLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.features = action.payload;
      })
      .addCase(getFeaturesLists.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.features = null;
        toast.error(action.payload);
      })
      .addCase(createOrUpdateContactInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateContactInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(createOrUpdateContactInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getContactInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contactinfo = action.payload;
      })
      .addCase(getContactInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.contactinfo = null;
        toast.error(action.payload);
      })
      .addCase(addPostLimit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPostLimit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(addPostLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getPostLimit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostLimit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.postLimit = action.payload;
      })
      .addCase(getPostLimit.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.postLimit = null;
        toast.error(action.payload);
      });
  },
});

export const { SETTING_RESET } = settingSlice.actions;

export default settingSlice.reducer;

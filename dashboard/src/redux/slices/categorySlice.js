import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryService from "../services/categoryService";

const initialState = {
  category: null,
  categorys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createCategory = createAsyncThunk("category/create", async (formdata, thunkAPI) => {
  try {
    return await categoryService.createCategory(formdata);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getallCategory = createAsyncThunk("category/all", async (_, thunkAPI) => {
  try {
    return await categoryService.getallCategory();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCategory = createAsyncThunk("category/single", async (_, thunkAPI) => {
  try {
    return await categoryService.getCategory();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCategory = createAsyncThunk("category/delete", async (categoryId, thunkAPI) => {
  try {
    return await categoryService.deleteCategory(categoryId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCategory = createAsyncThunk("category/update", async (updateData, thunkAPI) => {
  try {
    return await categoryService.updateCategory(updateData.id, updateData.formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    CATEGORY_RESET(state) {
      state.category = false;
      state.categorys = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success("Category added successfully!");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getallCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categorys = action.payload;
      })
      .addCase(getallCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.categorys = null;
        toast.error(action.payload);
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categorys = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.categorys = null;
        toast.error(action.payload);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CATEGORY_RESET } = categorySlice.actions;

export default categorySlice.reducer;

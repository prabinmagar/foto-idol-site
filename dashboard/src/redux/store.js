import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import filterReducer from "./features/filterSlice";
import categoryReducer from "./slices/categorySlice";
import resourceReducer from "./slices/resourceSlice";
import assetReducer from "./slices/settings/AssestLimitSlice";
import homeSliderReducer from "./slices/settings/homeSliderSlice";
import settingReducer from "./slices/settings/SettingSlice";
import postsReducer from "./slices/postsSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlice";
import aboutReducer from "./slices/aboutSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    userFilter: filterReducer,
    category: categoryReducer,
    resource: resourceReducer,
    assetlimit: assetReducer,
    homeslider: homeSliderReducer,
    setting: settingReducer,
    posts: postsReducer,
    user: userReducer,
    comment: commentReducer,
    about: aboutReducer
  },
});

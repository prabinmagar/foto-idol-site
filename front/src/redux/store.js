import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import emailReducer from "./slices/emailSlice";
import modalReducer from "./slices/modalSlice";
import sidebarReducer from "./slices/sidebarSlice";
import postsReducer from "./slices/postsSlice";
import categoryReducer from "./slices/categorySlice";
import commentReducer from "./slices/commentSlice";
import resourceReducer from "./slices/resourceSlice";
import settingReducer from "./slices/settings/SettingSlice";
import homeSliderReducer from "./slices/settings/homeSliderSlice";
import userReducer from "./slices/userSlice";
import aboutReducer from "./slices/aboutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    posts: postsReducer,
    category: categoryReducer,
    comment: commentReducer,
    resource: resourceReducer,
    setting: settingReducer,
    homeSlider: homeSliderReducer,
    user: userReducer,
    about: aboutReducer
  },
});

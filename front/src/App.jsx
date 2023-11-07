import { HomeScreen } from "./screens/home/HomeScreen";
// layouts
import { BaseLayout } from "./components/layout/BaseLayout";
import { SearchLayout } from "./components/layout/SearchLayout";
import { AdminLayout } from "./components/layout/AdminLayout";
// screens
import { SearchScreen } from "./screens/search/SearchScreen";
import NotFoundScreen from "./screens/error/NotFoundScreen";
import PolicyScreen from "./screens/misc/PolicyScreen";
import { CategoryImagesScreen } from "./screens/misc/CategoryImagesScreen";
// auth pages
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { Forgetpassword } from "./screens/auth/Forgetpassword";
import { ResetPassword } from "./screens/auth/ResetPassword";
import { LoginWithOTP } from "./screens/auth/LoginWithOTP";
// dashboard
import { Dashboard } from "./screens/admin/Dashboard";
import { Images } from "./screens/admin/Images";
import { Gallery } from "./screens/admin/Gallery";
import { Account } from "./screens/admin/Account";
import { Category } from "./screens/admin/Category";
import { ImagesEdit } from "./screens/admin/ImagesEdit";
import { CategoryEdit } from "./screens/admin/CategoryEdit";
import DetailsPage from "./screens/details/DetailsPage";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogInStatus,
  getUserProfile,
  selectIsLoggedIn,
  selectUser,
} from "./redux/slices/authSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Verify } from "./screens/admin/Verify";
import { HomeSearchScreen } from "./screens/home/HomeSearchScreen";
import { SocialLinks } from "./screens/admin/SocialLinks";
import MaintenanceScreen from "./screens/error/MaintenanceScreen";
import AboutScreen from "./screens/about/AboutScreen";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLogInStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUserProfile());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/privacy-policy" element={<PolicyScreen />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryImagesScreen />}
          />
          <Route path="/results/:searchQuery" element={<HomeSearchScreen />} />
          <Route path="about" element = { <AboutScreen />} />
          <Route path="/maintain" element={<MaintenanceScreen />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<Forgetpassword />} />
        <Route
          path="/auth/reset-password/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="/auth/login-with-otp/:email" element={<LoginWithOTP />} />
        <Route path="/search" element={<SearchLayout />}>
          <Route index element={<SearchScreen />} />
          <Route path=":postSlug" element={<DetailsPage />} />
        </Route>

        <Route
          path="/auth/verify/:verificationToken"
          element={
            <AdminLayout>
              <Verify />
            </AdminLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/images"
          element={
            <AdminLayout>
              <Images />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/images/edit/:postSlug"
          element={
            <AdminLayout>
              <ImagesEdit />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/account"
          element={
            <AdminLayout>
              <Account />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <AdminLayout>
              <Gallery />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/category"
          element={
            <AdminLayout>
              <Category />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/category/edit/:categoryId"
          element={
            <AdminLayout>
              <CategoryEdit />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/social_links"
          element={
            <AdminLayout>
              <SocialLinks />
            </AdminLayout>
          }
        />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

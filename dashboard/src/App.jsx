import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  UserTable,
  Verify,
  Login,
  Forgetpassword,
  ResetPassword,
  LoginWithOTP,
  Dashboard,
  Images,
  Gallery,
  Account,
  NotFoundScreen,
  AdminLayout,
  CategoryList,
  AddCategory,
  HomeSlider,
  AddHomeSlider,
  ViewHomeSlider,
  UpdateHomeSlider,
  Feature,
  ViewFeatures,
  ContactInfo,
  ServerErrorScreen,
  MaintenanceScreen,
} from "./utils/Router";
import {
  getLogInStatus,
  getUserProfile,
  selectIsLoggedIn,
  selectUser,
} from "./redux/slices/authSlice";
import { AddGallary } from "./screens/admin/AddGallary";
import { PostConfig } from "./screens/settings/PostConfig";
import CommentTable from "./screens/admin/users/CommentTable";
import { PostLimit } from "./screens/settings/PostLimit";
import About from "./screens/admin/about/About";
import { AddAbout } from "./screens/admin/about/AddAbout";
import { UpdatePricing } from "./screens/settings/pricing/UpdatePricing";
import { ViewPricing } from "./screens/settings/pricing/ViewPricing";
import { AddPricing } from "./screens/settings/pricing/AddPricing";
import { Pricing } from "./screens/settings/pricing/Pricing";
import { UpdateModal } from "./screens/settings/modal/UpdateModal";
import { ViewModal } from "./screens/settings/modal/ViewModal";
import { AddModal } from "./screens/settings/modal/AddModal";
import { PopupModal } from "./screens/settings/modal/PopupModal";
import Location from "./screens/admin/location/Location";
import { AddLocation } from "./screens/admin/location/AddLocation";

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route
            path="/auth/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/login-with-otp/:email" element={<LoginWithOTP />} />
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
            path="/admin/images/add"
            element={
              <AdminLayout>
                <AddGallary />
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
            path="/admin/users"
            element={
              <AdminLayout>
                <UserTable />
              </AdminLayout>
            }
          />

          {/* setting config */}
          <Route
            path="/admin/assetlimit"
            element={
              <AdminLayout>
                <PostConfig />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/postlimit"
            element={
              <AdminLayout>
                <PostLimit />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/homeslider"
            element={
              <AdminLayout>
                <HomeSlider />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/homeslider/addhomeslider"
            element={
              <AdminLayout>
                <AddHomeSlider />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/homeslider/:id"
            element={
              <AdminLayout>
                <ViewHomeSlider />
              </AdminLayout>
            }
          />
          <Route
            path="/homeslider/update/:id"
            element={
              <AdminLayout>
                <UpdateHomeSlider />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/modal"
            element={
              <AdminLayout>
                <PopupModal />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/modal/addmodal"
            element={
              <AdminLayout>
                <AddModal />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/modal/:id"
            element={
              <AdminLayout>
                <ViewModal />
              </AdminLayout>
            }
          />
          <Route
            path="/modal/update/:id"
            element={
              <AdminLayout>
                <UpdateModal />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/pricing"
            element={
              <AdminLayout>
                <Pricing />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/pricing/addpricing"
            element={
              <AdminLayout>
                <AddPricing />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/pricing/:id"
            element={
              <AdminLayout>
                <ViewPricing />
              </AdminLayout>
            }
          />
          <Route
            path="/pricing/update/:id"
            element={
              <AdminLayout>
                <UpdatePricing />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/featured"
            element={
              <AdminLayout>
                <Feature />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/featured/view"
            element={
              <AdminLayout>
                <ViewFeatures />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <AdminLayout>
                <ContactInfo />
              </AdminLayout>
            }
          />
          {/* category */}
          <Route
            path="/admin/category"
            element={
              <AdminLayout>
                <CategoryList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/addcategory"
            element={
              <AdminLayout>
                <AddCategory />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/comments"
            element={
              <AdminLayout>
                <CommentTable />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/about"
            element={
              <AdminLayout>
                <About />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/about/addabout"
            element={
              <AdminLayout>
                <AddAbout />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/location"
            element={
              <AdminLayout>
                <Location />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/location/addlocation"
            element={
              <AdminLayout>
                <AddLocation />
              </AdminLayout>
            }
          />
          <Route path="/error/server" element={<ServerErrorScreen />} />
          <Route path="/error/maintenance" element={<MaintenanceScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

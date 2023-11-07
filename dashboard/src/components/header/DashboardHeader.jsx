import { HiMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import { UserProfileAfterLogin } from "./UserProfileAterLogin";
import { UploadBox } from "../common/UploadBox";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { RESET, logout } from "../../redux/slices/authSlice";
import { staticImages } from "../../images";

export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const photo = user?.avatar?.url ? user?.avatar?.url : (user?.avatar ? user?.avatar : staticImages.blank_user);

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="bg-white z-50 shadow-lg rounded-md px-3 py-1 w-full min-h-[56px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-10">
            <div className="logo flex gap-1 items-center">
              <button
                type="button"
                className="text-dark-moonstone me-4 lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
              >
                <HiMenuAlt2 size={22} />
              </button>
              <UploadBox />
            </div>
          </div>
          <div className="items-center gap-3 flex">
            <UserProfileAfterLogin
              user={user}
              photo={photo}
              logoutUser={logoutUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

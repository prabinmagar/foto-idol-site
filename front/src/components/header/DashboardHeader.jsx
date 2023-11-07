import {
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import { UserProfileAfterLogin } from "./UserProfileAterLogin";
import { UploadBox } from "../common/UploadBox";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/slices/authSlice";
import { RESET, logout } from "../../redux/slices/authSlice";

export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const photo = user?.avatar?.url ? user?.avatar?.url : user?.avatar;

  const getTodayDate = () => {
    const date = new Date();
    const options = {
      // weekday: 'long',
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return <span>{date.toLocaleString("en-IN", options)}</span>;
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <>
      <div className="bg-white z-50 shadow-md shadow-gray-200 rounded-lg px-3 py-2.5 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="logo flex gap-1 items-center">
              <button
                type="button"
                className="text-dark-moonstone lg:me-4 me-2 lg:hidden"
                onClick={() => dispatch(toggleSidebar())}
              >
                <HiMenuAlt2 size={22} />
              </button>
              <UploadBox />
            </div>
          </div>
          <div className="items-center gap-3 flex">
            {user?.isVerified ? (
              <div className="flex items-center gap-x-2 md:border-r-[1px] border-gray-400 md:pe-3">
                <AiFillCheckCircle className="text-green-400" />
                <span className="text-dark-blue font-medium text-sm font-inter hidden xs:flex">
                  Verified
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-2 md:border-r-[1px] border-gray-400 md:pe-3">
                <AiFillCloseCircle className="text-red-400" />
                <span className="font-inter font-medium hidden xs:flex text-red-400 text-sm">
                  Unverified
                </span>
              </div>
            )}
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

import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  MenuItem,
} from "@material-tailwind/react";
import { BiUserCircle } from "react-icons/bi";
import {
  AiOutlineDashboard,
  AiOutlinePoweroff,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const UserProfileAfterLogin = ({ logoutUser, photo, user }) => {
  const location = useLocation();
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div className="flex items-center gap-x-[16px] cursor-pointer">
          <div
            className={`font-inter font-medium uppercase text-dark-blue text-sm tracking-[1px] flex items-center gap-x-2`}
          >
            <AiOutlineUser className="text-dark-blue" />
            <span>
              {user?.name?.slice(0, 12)}
              {user?.name?.length > 12 ? "..." : ""}
            </span>
          </div>
          <Avatar
            src={photo}
            size="sm"
            variant="circular"
            alt={user}
            className="w-[30px] h-[30px]"
          />
        </div>
      </MenuHandler>
      <MenuList>
        <Link to="/admin" className="outline-none">
          <MenuItem className="flex items-center gap-2">
            <AiOutlineDashboard size={18} />
            <Typography variant="small" className="font-normal">
              Dashboard
            </Typography>
          </MenuItem>
        </Link>
        <Link to="/admin/account" className=" outline-none border-none">
          <MenuItem className="flex items-center gap-2">
            <BiUserCircle size={18} />
            <Typography variant="small" className="font-normal">
              My Profile
            </Typography>
          </MenuItem>
        </Link>
        <Link
          to="/admin/account"
          className={`outline-none border-none ${
            !location.pathname.startsWith("/admin") && "hidden"
          }`}
        >
          <MenuItem className="flex items-center gap-2">
            <AiOutlineSetting size={18} />
            <Typography variant="small" className="font-normal">
              Edit Profile
            </Typography>
          </MenuItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 " onClick={logoutUser}>
          <AiOutlinePoweroff size={18} />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

UserProfileAfterLogin.propTypes = {
  logoutUser: PropTypes.any,
  photo: PropTypes.any,
  user: PropTypes.any,
};

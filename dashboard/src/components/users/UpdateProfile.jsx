import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  getUserProfile,
  updateUserProfile,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { Button, Card } from "@material-tailwind/react";
import SpinLoader from "../common/SpinLoader";
import { AiFillCamera } from "react-icons/ai";

export const UpdateProfile = () => {
  useRedirectLoggedOutUser("/auth/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  const initialState = {
    name: user?.name || "",
    address: user?.addres || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    role: user?.role || "",
    avatar: user?.avatar || user?.avatar?.url || "",
    isVerified: user?.isVerified || false,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
    setProfileImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("bio", profile.bio);

      if (profileImg) {
        formData.append("avatar", profileImg);
      }
      await dispatch(updateUserProfile(formData));
      await dispatch(getUserProfile);
      navigate("/admin/account");
    } catch (error) {
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        avatar: user?.avatar,
        role: user?.role,
        address: user?.address,
        country: user?.country,
        isVerified: user?.isVerified,
      });
    }
  }, [user]);

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={saveProfile}>
      <div className="flex flex-col gap-8 xl:flex-row xxl:items-start">
        <Card className="shadow-none w-[290px] mx-auto">
          <label
            htmlFor="avatar"
            className="h-[180px] w-[180px] mx-auto rounded-full bg-gray-200 shadow overflow-hidden relative"
          >
            {profileImgPreview ? (
              <img
                src={profileImgPreview}
                alt="profileImg"
                className="w-full h-full object-cover rounded-full"
              />
            ): (<img src={profile?.avatar?.url ? profile?.avatar?.url : profile?.avatar} className="w-full h-full object-cover rounded-full" alt="profile image" />)}
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              onClick={handleCameraIconClick}
            >
              <AiFillCamera size={48} className="mx-auto text-moonstone" />
              {/* <span className="font-medium whitespace-nowrap inline-block mt-1 text-white">
                Choose Photo
              </span> */}
            </button>
          </label>
          <input
            name="avatar"
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            className="pt-[7px] hidden"
          />
          <div className="flex flex-col items-center justify-center mt-6">
            <p className="font-inter text-sm font-medium text-dark/90">
              Click on icon to change profile picture.
            </p>
          </div>
        </Card>
        <div className="flex-auto lg:px-10 py-4 max-w-[720px] mx-auto xxl:ms-0">
          <div>
            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6> */}
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Fullname
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter focus:bg-transparent focus:border-moonstone"
                    value={profile?.name}
                    name="name"
                    placeholder={profile?.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="px-3 py-3 placeholder-red-300 text-red-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-red-50 bg-red-50 font-medium font-inter"
                    disabled
                    defaultValue={user?.email}
                  />
                </div>
              </div>
            </div>
            <hr className="mt-2 mb-4 border-b-1 border-blueGray-300" />
            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              More Information
            </h6> */}
            <div className="flex flex-wrap">
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter focus:bg-transparent focus:border-moonstone"
                    value={profile?.address}
                    name="address"
                    placeholder={profile?.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Phone No.
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter focus:bg-transparent focus:border-moonstone"
                    value={profile?.phone}
                    name="phone"
                    placeholder={profile?.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <hr className="mt-2 mb-4 border-b-1 border-blueGray-300" />
            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase font-inter">
              Bio
            </h6> */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter resize-none focus:bg-transparent focus:border-moonstone scrollbar-y-dir"
                    rows="4"
                    value={profile?.bio}
                    name="bio"
                    placeholder={profile?.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            {isLoading && <SpinLoader />}
            <Button type="submit" className="bg-moonstone rounded">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

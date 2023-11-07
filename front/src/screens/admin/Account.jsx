import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { UpdateProfile } from "../../components/common/users/UpdateProfile";
import { UpdatePassword } from "../../components/common/users/UpdatePassword";

export function Account() {
  useRedirectLoggedOutUser("/auth/login");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="my-6 shadow bg-white rounded-lg">
      <Tabs value="profile">
        <TabsHeader className="flex-col md:flex-row bg-white py-3 px-3 account-tab-head">
          <Tab className="py-2.5" value="profile">
            <div className="flex items-center gap-2 font-medium opacity-90">
              {React.createElement(UserCircleIcon, {
                className: "w-5 h-5",
              })}
              My Profile
            </div>
          </Tab>
          <Tab className="py-2.5" value="edit">
            <div className="flex items-center gap-2 font-medium opacity-90">
              {React.createElement(AiOutlineEdit, { className: "w-5 h-5" })}
              Edit Profile
            </div>
          </Tab>
          <Tab className="py-2.5" value="settings">
            <div className="flex items-center gap-2 font-medium opacity-90">
              {React.createElement(Cog6ToothIcon, { className: "w-5 h-5" })}
              Settings
            </div>
          </Tab>
        </TabsHeader>
        {user && (
          <TabsBody>
            <TabPanel className="p-0" value="profile">
              {/* <div className="flex flex-col gap-8 xl:flex-row xxl:items-start">
                <Card className="shadow-none w-[290px] mx-auto">
                  <CardHeader
                    floated={false}
                    className="h-[180px] w-[180px] mx-auto rounded-full overflow-hidden"
                  >
                    <img
                      src={user?.avatar?.url ? user?.avatar?.url : user?.avatar}
                      alt="profile-picture"
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardBody className="text-center pb-0">
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      @{user?.name}
                    </Typography>
                  </CardBody>
                </Card>

                <div className="flex-auto lg:px-10 py-4 max-w-[720px] mx-auto xxl:ms-0">
                  {!user?.isVerified && <Notification />}
                  <form>
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
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.name}
                            readOnly
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
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.country}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 px-1 lg:mb-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.address}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-4 border-b-1 border-blueGray-300" />
                    <div className="flex flex-wrap">
                      <div className="w-full sm:w-4/12 px-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                            htmlFor="grid-password"
                          >
                            Phone No.
                          </label>
                          <input
                            type="email"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.phone}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-4/12 px-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter"
                            htmlFor="grid-password"
                          >
                            Role
                          </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke capitalize font-medium font-inter"
                            defaultValue={user?.role}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-4/12 px-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="uppercase text-blueGray-600 text-xs font-bold mb-2 font-inter flex items-center"
                            htmlFor="grid-password"
                          >
                            Verified{" "}
                            {user?.isVerified ? (
                              <AiFillCheckCircle
                                size={18}
                                className="ms-2 text-green-400"
                              />
                            ) : (
                              <AiFillCloseCircle
                                size={18}
                                className="ms-2 text-red-600"
                              />
                            )}
                          </label>
                          <input
                            type="text"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter"
                            defaultValue={user?.isVerified ? "Yes" : "No"}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-4 border-b-1 border-blueGray-300" />
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
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter resize-none"
                            rows="4"
                            readOnly
                            defaultValue={user?.bio}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}

              <section className="relative bg-gray-100">
                <div className="container mx-auto lg:px-4 pt-8">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg">
                    <div className="lg:px-6">
                      <div className="flex flex-wrap justify-center items-center mt-10">
                        <div className="w-full px-4 flex justify-center">
                          <div className="relative">
                            <img
                              src={
                                user?.avatar?.url
                                  ? user?.avatar?.url
                                  : user?.avatar
                              }
                              alt="profile image"
                              className="shadow-xl rounded-full h-auto align-middle border-none max-w-[150px]"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 lg:order-3">
                          <div className="flex justify-center pt-4 gap-x-6">
                            <div className="p-3 text-center">
                              <Typography
                                color="blue-gray"
                                className="font-inter font-semibold text-base"
                              >
                                Role
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-inter font-normal mt-1"
                              >
                                Author
                              </Typography>
                            </div>
                            <div className="font-inter p-3 text-center">
                              <Typography
                                color="blue-gray"
                                className="font-inter font-semibold text-base"
                              >
                                Verified
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-inter font-normal mt-1"
                              >
                                {user?.isVerified ? (
                                  <AiFillCheckCircle
                                    className="mx-auto text-green-500"
                                    size={18}
                                  />
                                ) : (
                                  <AiFillCloseCircle className="mx-auto text-red-500" size={18} />
                                )}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-4 rounded border-[1px] mx-4 py-4 font-inter">
                        <h3 className="text-3xl font-semibold leading-normal mb-2 text-dark/90">
                          {user?.name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-dark font-bold uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-lg text-dark"></i>
                          {user?.address}, {user?.country}
                        </div>
                        <div className="mb-1 text-dark opacity-90 mt-6">
                          <i className="fas fa-briefcase mr-2 text-lg text-dark"></i>
                          <span className="font-semibold text-moonstone">
                            Contact No
                          </span>{" "}
                          : {user?.phone}
                        </div>
                        <div className="mb-2 text-dark opacity-90">
                          <i className="fas fa-university text-lg text-dark"></i>
                          {user?.email}
                        </div>
                      </div>
                      <div className="mt-6 pt-6 pb-2 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-base text-dark font-inter opacity-60">
                              {user?.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="relative bg-blueGray-200 pb-6">
                  <div className="container mx-auto px-4"></div>
                </footer>
              </section>
            </TabPanel>
            <TabPanel value="edit" className="pt-8">
              <UpdateProfile />
            </TabPanel>
            <TabPanel value="settings">
              <UpdatePassword />
            </TabPanel>
          </TabsBody>
        )}
      </Tabs>
    </div>
  );
}

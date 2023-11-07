import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineCheck,
  AiOutlineEdit,
} from "react-icons/ai";
import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { UpdateProfile } from "../../components/users/UpdateProfile";
import { UpdatePassword } from "../../components/users/UpdatePassword";
import { staticImages } from "../../images";

export function Account() {
  useRedirectLoggedOutUser("/login");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="my-8 rounded-md">
      <div
        className="p-8 overflow-hidden rounded-2xl min-h-[240px] shadow-lg"
        style={{
          background: `linear-gradient(90deg, rgba(0, 143, 161, 0.3) 0%, rgba(0, 188, 212, 0.7) 100%), url(${staticImages.intro_hero}) center/cover no-repeat`,
        }}
      ></div>

      <div className="max-w-[96%] mx-auto -mt-20">
        <div className="bg-white rounded-xl shadow-lg pt-1">
          <div className="relative flex justify-between flex-wrap items-start px-3 py-2 overflow-hidden border-0 rounded-md bg-white shadow-default m-4">
            <div className="flex flex-wrap -mx-3">
              <div className="flex-none w-auto max-w-full px-3">
                <div className="text-base ease-soft-in-out h-[74px] w-[74px] relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                  <img
                    src={user?.avatar?.url ? user?.avatar?.url : (user?.avatar ? user?.avatar : staticImages.blank_user)}
                    alt="profile_image"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              <div className="flex-none w-auto max-w-full px-3 my-auto">
                <div className="h-full">
                  <h5 className="mb-1 text-blue-gray-500 font-medium">
                    @{user?.name}
                  </h5>
                  <p className="mb-0 font-semibold text text-sm capitalize">
                    Role: {user?.role}
                  </p>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
            </div>
            {/* <div className="flex items-center gap-x-3">
              <p className="text font-medium text-sm">Verfication</p>
              <div className="bg-gradient-to-tr from-green-400 to-green-600 shadow-lg shadow-black/20 mt-1 mr-2 h-6 w-6 text-white rounded-full inline-flex items-center justify-center">
                <AiOutlineCheck />
              </div>
            </div> */}
          </div>
          <Tabs value="profile">
            <TabsHeader className="flex-col bg-white md:flex-row px-4 py-3 max-w-[600px]">
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
              <TabsBody className="pb-10 bg-whitesmoke">
                <TabPanel className="pt-10" value="profile">
                  <div className="grid lg: grid-cols-[1fr_1fr]">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-md h-full p-3">
                      <div className="flex items-center w-full max-w-full px-3 pt-5 shrink-0 md:w-8/12 md:flex-none">
                        <h6 className="mb-0 text text-base font-semibold">
                          About Photo Idol
                        </h6>
                      </div>
                      <div className="flex-auto p-4">
                        <p className="text-sm text">
                          {
                            user?.bio
                          }
                        </p>
                        <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                          <li className="relative block px-4 py-2 pt-0 pl-0 text bg-white border-0 rounded-t-lg text-sm">
                            <strong className="text font-semibold">
                              Full Name:
                            </strong>{" "}
                            &nbsp; {user?.name}
                          </li>
                          <li className="relative block px-4 py-2 pl-0  bg-white text border-0 border-t-0 text-sm">
                            <strong className="text font-semibold">
                              Mobile:
                            </strong>{" "}
                            &nbsp; {user?.phone || "Not mentioned"}
                          </li>
                          <li className="relative block px-4 py-2 pl-0  bg-white text border-0 border-t-0 text-sm">
                            <strong className="text font-semibold">
                              Email:
                            </strong>{" "}
                            &nbsp; {user?.email}
                          </li>
                          <li className="relative block px-4 py-2 pl-0  bg-white text border-0 border-t-0 text-sm">
                            <strong className="text font-semibold">
                              Location:
                            </strong>{" "}
                            &nbsp; {user?.address || "Not mentioned"}
                          </li>
                          <li className="relative block px-4 py-2 pl-0  bg-white text border-0 border-t-0 text-sm">
                            <strong className="text font-semibold">
                              Country:
                            </strong>{" "}
                            &nbsp; {user?.country || "Not mentioned"}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}

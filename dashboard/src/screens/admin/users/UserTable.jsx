import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import ReactPaginate from "react-paginate";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import {
  FILTER_USERS,
  selectFilterUsers,
} from "../../../redux/features/filterSlice";
import {
  deleteUserByAdmin,
  getAllUserByAdmin,
} from "../../../redux/slices/authSlice";
import { UpdateRole } from "../../../components/users/UpdateRole";
import { AiFillEye, AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { getAllLinks, selectAllLinks } from "../../../redux/slices/userSlice";
import { ROLE_ADMIN } from "../../../utils/constants";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];

const TABLE_HEAD = [
  "S.N",
  "Member",
  "Role",
  "Country",
  "Address",
  "Verified",
  "Phone",
  "Change Role",
  "Action",
];

export const UserTable = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.auth);
  const usersList = users.usersList;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(usersList);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    handleOpen();
  };

  useEffect(() => {
    dispatch(getAllUserByAdmin());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUserByAdmin(id));
    await dispatch(getAllUserByAdmin());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete this users",
      message: "Are you sure to do delete this user?.",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const [searchQuery, setSearchQuery] = useState("");

  // ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // ### POST SEARCHING & FILTER
  const filteredUsers = usersList?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(usersList?.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  return (
    <>
      <Card className="w-full rounded-md shadow-lg mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader className="bg-transparent">
                <p className="font-inter text-dark-blue">
                  All users information is provided below:
                </p>
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-80 py-1 font-inter">
              <Input
                label="Search by Username"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="font-inter placeholder:font-inter"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll scrollbar-x-dir p-1">
          {!isLoading && users?.usersList?.length === 0 ? (
            <Typography variant="h3" className="p-5">
              No User Found
            </Typography>
          ) : (
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3"
                    >
                      <Typography
                        color="blue-gray"
                        className="font-medium text-dark text-[15px]"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((list, index) => {
                  const {
                    _id,
                    name,
                    email,
                    role,
                    avatar,
                    phone,
                    isVerified,
                    country,
                    address,
                  } = list;
                  const isLast = index === list.length - 1;
                  const classes = isLast
                    ? "px-4 py-2"
                    : "px-4 py-2 border-b border-blue-gray-50";

                  return (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {currentPage > 1
                            ? index + 1 + (currentPage - 1) * 10
                            : index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={avatar?.url || avatar}
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {country ? country : "Unknown"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {address ? address : "Unknown"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={isVerified ? "true" : "false"}
                            color={isVerified ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone ? phone : "---"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {
                          role !== ROLE_ADMIN ? <UpdateRole
                          currentRole={role}
                          _id={_id}
                          email={email}
                        /> : <div className="uppercase font-semibold text-sm text-center bg-moonstone text-white py-2">Admin</div>
                        }
                      </td>
                      <td className={classes}>
                        {role !== ROLE_ADMIN ? (
                          <div className="flex gap-2">
                            {" "}
                            <Tooltip content="View User">
                              <IconButton
                                size="sm"
                                className="rounded bg-moonstone"
                                onClick={() => handleViewUser(list)}
                              >
                                <AiFillEye size={20} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete User">
                              <IconButton
                                size="sm"
                                className="rounded"
                                color="red"
                                onClick={() => confirmDelete(_id)}
                              >
                                <MdDelete size={20} />
                              </IconButton>
                            </Tooltip>
                          </div>
                        ) : (
                          <div className="flex items-center justify-start">
                            <AiFillStar className="text-yellow-800" size={24} />
                            <AiFillStar className="text-yellow-800" size={24} />
                            <AiFillStar className="text-yellow-800" size={24} />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        {users?.usersList?.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal font-inter"
            >
              Page {currentPage} of{" "}
              {Math.ceil(filteredUsers?.length / usersPerPage)}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="rounded border-[1px] border-moonstone text-moonstone"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                className="rounded border-[1px] border-pink text-pink"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* view the user details */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="px-3 overflow-y-scroll max-h-[90vh] scrollbar-y-dir"
      >
        <DialogHeader className="text-2xl flex justify-center pb-0">
          <p className="pt-3">User Details</p>
        </DialogHeader>
        <DialogBody className="pt-2">
          <h3 className="text-center font-medium text-base mb-3">
            The details are show below:{" "}
          </h3>
          {selectedUser && (
            <>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 border-gray-200 border-[1px] rounded-md p-2">
                  <img
                    className="h-[60px] w-[60px] object-cover rounded-full"
                    src={selectedUser?.avatar?.url || selectedUser?.avatar}
                    alt="nature image"
                  />
                  <div>
                    <div className="">
                      <Typography variant="h6" className="uppercase text-base">
                        {selectedUser?.name}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">
                        {selectedUser?.email}
                        {", "}
                        {selectedUser?.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start flex-col gap-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                      <Typography variant="h6">Verified</Typography>
                      <Input
                        className="w-full capitalize"
                        value={selectedUser?.isVerified || ""}
                        readOnly
                        disabled
                        size="lg"
                        label="Verified"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                      <Typography variant="h6">Address</Typography>
                      <Input
                        className="w-full"
                        value={selectedUser?.address || "Not mentioned"}
                        readOnly
                        size="lg"
                        label="Address"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                      <Typography variant="h6">Phone Number</Typography>
                      <Input
                        className="w-full"
                        value={selectedUser?.phone || "Not mentioned"}
                        readOnly
                        size="lg"
                        label="Phone Number"
                        disabled
                      />
                    </div>
                    <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                      <Typography variant="h6">Role</Typography>
                      <Input
                        className="w-full capitalize"
                        value={selectedUser?.role}
                        readOnly
                        size="lg"
                        label="Role"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-1.5 justify-between mt-1">
                    <Typography variant="h6">User Bio.</Typography>
                    <Textarea
                      className="w-full"
                      value={selectedUser?.bio || "Not Found"}
                      readOnly
                      size="lg"
                      label="Bio"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={handleOpen} className="rounded">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

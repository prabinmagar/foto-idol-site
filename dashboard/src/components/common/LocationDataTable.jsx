import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
  Input
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { UpdateLocation } from "../../screens/admin/location/UpdateLocation";

export const LocationDataTable = ({ tableHead, datalist, handleDelete }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationViewOpen, setLocationViewOpen] = useState(false);
  const handleLocationViewOpen = () => setLocationViewOpen(!locationViewOpen);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleViewLocation = (about) => {
    setSelectedLocation(about);
    handleLocationViewOpen();
  };

  const handleOpenUpdateDialog = (about) => {
    setSelectedLocation(about);
    setOpenUpdateDialog(true);
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-lg mt-4 p-6">
        <div className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-dark">
                All Branches
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about brances.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <NavLink to="/admin/location/addlocation">
                <div className="flex items-center">
                  <Button className="py-2.5 rounded bg-moonstone">
                    Create
                  </Button>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {datalist.length > 0 ? (
          <div className="relative scrollbar-x-dir overflow-x-auto rounded">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-inter min-w-[1200px]">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  {tableHead.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue-gray-50/40 px-5 py-3"
                    >
                      <Typography
                        color="blue-gray"
                        className="font-medium text-dark text-[15px] whitespace-nowrap"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datalist.map((item, index) => (
                  <tr
                    className="bg-white even:bg-blue-gray-50/50"
                    key={item._id}
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.name}
                    </td>
                    <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.address}
                    </td>
                    <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.phone}
                    </td>
                    <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.email}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-start items-center gap-2">
                        <IconButton
                          onClick={() => handleViewLocation(item)}
                          size="sm"
                          className="rounded bg-moonstone"
                          color="blue"
                        >
                          <AiOutlineEye size={20} />
                        </IconButton>
                        <IconButton
                          className="w-[32px] h-[32px] rounded"
                          color="red"
                          onClick={() => handleDelete(item._id)}
                        >
                          <AiOutlineDelete size={16} />
                        </IconButton>
                        <IconButton
                          size="sm"
                          className="rounded"
                          color="green"
                          onClick={() => handleOpenUpdateDialog(item)}
                        >
                          <AiOutlineEdit size={20} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-6 font-inter"
          >
            No about content found!
          </Typography>
        )}
      </div>

      {/* view the catgeory details */}
      <Dialog
        open={locationViewOpen}
        handler={handleLocationViewOpen}
        className="px-3 overflow-y-scroll max-h-[90vh] scrollbar-y-dir"
      >
        <DialogHeader className="text-2xl flex justify-center pb-0">
          <p className="pt-3">Branch Details</p>
        </DialogHeader>
        <DialogBody className="pt-2">
          <h3 className="text-center font-medium text-base mb-5">
            The details are show below:{" "}
          </h3>
          {selectedLocation && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-start flex-col gap-3">
                <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Name
                  </Typography>
                  <Input
                    className="w-full"
                    value={selectedLocation?.name || "Unknown"}
                    readOnly
                    size="lg"
                    label="Branch Name"
                  />
                </div>
                <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Address
                  </Typography>
                  <Input
                    className="w-full"
                    value={selectedLocation?.address || "Unknown"}
                    readOnly
                    size="lg"
                    label="Address"
                  />
                </div>
                <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Phone Number
                  </Typography>
                  <Input
                    className="w-full"
                    value={selectedLocation?.phone || "Unknown"}
                    readOnly
                    size="lg"
                    label="Phone Number"
                  />
                </div>
                <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Email
                  </Typography>
                  <Input
                    className="w-full"
                    value={selectedLocation?.email || "Unknown"}
                    readOnly
                    size="lg"
                    label="Email address"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            onClick={handleLocationViewOpen}
            className="rounded"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {selectedLocation && (
        <UpdateLocation
          openLocationUpdate={openUpdateDialog}
          onLocationUpdateClose={() => {
            setOpenUpdateDialog(false);
            setSelectedLocation(null);
          }}
          location={selectedLocation}
        />
      )}
    </>
  );
};

LocationDataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  datalist: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

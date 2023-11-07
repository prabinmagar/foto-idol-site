import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {
  Avatar,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import ImageViewer from "../common/ImageViewer";
import { DateFormatter } from "./DateFormatter";
import { useState } from "react";
import { UpdateAbout } from "../../screens/admin/about/UpdateAbout";

export const AboutDataTable = ({ tableHead, datalist, handleDelete }) => {
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [aboutViewOpen, setAboutViewOpen] = useState(false);
  const handleAboutViewOpen = () => setAboutViewOpen(!aboutViewOpen);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleViewAbout = (about) => {
    setSelectedAbout(about);
    handleAboutViewOpen();
  };

  const handleOpenUpdateDialog = (about) => {
    setSelectedAbout(about);
    setOpenUpdateDialog(true);
  };

  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <div className="bg-white rounded-md shadow-lg mt-4 p-6">
        <div className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-dark">
                About Page Blocks
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about page blocks.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <NavLink to="/admin/about/addabout">
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
                    {/* <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.title?.slice(0, 40) + "..."}
                    </td>
                    <td className="px-6 py-3 capitalize text-gray-700">
                      {item?.description?.slice(0, 80) + "..."}
                    </td> */}
                    <td className="px-6 py-3 capitalize text-gray-700">
                      <Avatar
                        src={item?.cover?.filePath}
                        size="sm"
                        onClick={() => openModal(item?.cover?.filePath)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-3 capitalize text-gray-700 whitespace-nowrap">
                      {<DateFormatter date={item?.createdAt} />}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex justify-start items-center gap-2">
                        <IconButton
                          onClick={() => handleViewAbout(item)}
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
        open={aboutViewOpen}
        handler={handleAboutViewOpen}
        className="px-3 overflow-y-scroll max-h-[90vh] scrollbar-y-dir"
      >
        <DialogHeader className="text-2xl flex justify-center pb-0">
          <p className="pt-3">About Details</p>
        </DialogHeader>
        <DialogBody className="pt-2">
          <h3 className="text-center font-medium text-base mb-5">
            The details are show below:{" "}
          </h3>
          {selectedAbout && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-start flex-col gap-5">
                {/* <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Title
                  </Typography>
                  <Input
                    className="w-full"
                    value={selectedAbout?.title || "Unknown"}
                    readOnly
                    size="lg"
                    label="Category Name"
                  />
                </div>
                <div className="flex flex-col gap-y-3 justify-between ">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Description
                  </Typography>
                  <div className="border-[1px] border-dark-blue/50 rounded-lg p-3 text-[15px] quill-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedAbout?.description,
                      }}
                    />
                  </div>
                </div> */}
                <div className="flex flex-col gap-y-3 justify-between">
                  <Typography
                    variant="h6"
                    className="mt-1 md:w-1/3 text-gray-700"
                  >
                    Cover Image
                  </Typography>
                  <img
                    src={selectedAbout?.cover?.filePath}
                    alt=""
                    className="w-full h-[280px] rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            onClick={handleAboutViewOpen}
            className="rounded"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {selectedAbout && (
        <UpdateAbout
          openAboutUpdate={openUpdateDialog}
          onAboutUpdateClose={() => {
            setOpenUpdateDialog(false);
            setSelectedAbout(null);
          }}
          about={selectedAbout}
        />
      )}
    </>
  );
};

AboutDataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  datalist: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

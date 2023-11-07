import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import ImageViewer from "../common/ImageViewer";
import { HOME_SETTING_OPT_TWO } from "../../utils/constants";

export const ModalDataTable = ({
  tableHead,
  datalist,
  homeslidershow,
  handleDelete,
}) => {
  const onlyModalList = datalist.filter(
    (item) => item?.category === HOME_SETTING_OPT_TWO
  );
  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();
  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <div className="bg-white rounded-md shadow-lg my-10 p-6">
        <div className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-dark">
                Home Popup Modal
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-gray-800"
              >
                The popup modal of home page can be managed from here.
              </Typography>
              <p className="text mt-2 text-sm font-medium">
                <span className="font-semibold">Note:</span> You can create only
                one popup modal.
              </p>
            </div>
            {onlyModalList?.length < HOME_SETTING_OPT_TWO && (
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <NavLink to="/admin/modal/addmodal">
                  <Button className="py-2.5 rounded bg-moonstone">
                    Create
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        {onlyModalList?.length > 0 ? (
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
                        className="font-medium text-dark text-[15px]"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {onlyModalList.map((item, index) => {
                  return (
                    <tr
                      className="bg-white even:bg-blue-gray-50/50"
                      key={item._id}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td
                        scope="row"
                        className="flex items-center px-6 py-4 bg-transparent text-gray-900 whitespace-nowrap"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.user?.avatar?.url || item?.user?.avatar}
                            alt={item._id}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <div className="pl-3">
                              <div className="text-sm font-semibold uppercase">
                                {" "}
                                {item?.user?.name}
                              </div>
                              <div className="font-normal text-gray-500">
                                {" "}
                                {item?.user?.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      {homeslidershow && (
                        <>
                          <td className="px-6 py-4 capitalize text-gray-700">
                            {item?.title?.slice(0, 40) + "..."}
                          </td>
                          <td className="px-6 py-4 capitalize text-gray-700">
                            {item?.subtitle?.slice(0, 40) + "..."}
                          </td>
                          <td className="px-6 py-4 capitalize text-gray-700">
                            {item?.description?.slice(0, 40) + "..."}
                          </td>
                          <td className="px-6 py-4 capitalize text-gray-700">
                            <Avatar
                              src={item.cover?.filePath}
                              alt={item?.title}
                              size="sm"
                              onClick={() => openModal(item?.cover?.filePath)}
                            />
                          </td>
                          <td className="px-6 py-4 capitalize text-gray-700">
                            <span className="whitespace-nowrap">
                              {item?.category}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <NavLink to={`/admin/modal/${item._id}`}>
                            <IconButton className="w-[32px] h-[32px] rounded bg-moonstone">
                              <AiOutlineEye size={16} />
                            </IconButton>
                          </NavLink>
                          <IconButton
                            className="w-[32px] h-[32px] rounded"
                            color="red"
                            onClick={() => handleDelete(item._id)}
                          >
                            <AiOutlineDelete size={16} />
                          </IconButton>
                          <NavLink to={`/modal/update/${item._id}`}>
                            <IconButton
                              className="w-[32px] h-[32px] rounded"
                              color="green"
                            >
                              <AiOutlineEdit size={16} />
                            </IconButton>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text mt-2 text-sm font-medium">
            No any modal information found!
          </p>
        )}
      </div>
    </>
  );
};

ModalDataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  datalist: PropTypes.array.isRequired,
  homeslidershow: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

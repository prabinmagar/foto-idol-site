import { NavLink } from "react-router-dom";
import {
  AiFillWarning,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import ImageViewer from "../common/ImageViewer";
import {
  HOME_SETTING_OPT_ONE,
  HOME_SETTING_OPT_ONE_LIMIT,
} from "../../utils/constants";

export const SliderDataTable = ({
  tableHead,
  datalist,
  homeslidershow,
  handleDelete,
}) => {
  const onlySliderList = datalist.filter(
    (item) => item?.category === HOME_SETTING_OPT_ONE
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
                Home Banner Slider
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-gray-800"
              >
                All home page banner slider can be managed from here.
              </Typography>
              <p className="text mt-2 text-sm font-medium">
                Total banner photos available: {onlySliderList?.length || 0} out
                of {HOME_SETTING_OPT_ONE_LIMIT} (
                {HOME_SETTING_OPT_ONE_LIMIT - onlySliderList?.length || 0}{" "}
                remaining).
              </p>
              {onlySliderList?.length === HOME_SETTING_OPT_ONE_LIMIT && (
                <p className="inline-flex flex-wrap items-center gap-x-2 text-sm text-red-500 mt-3 border-[1px] border-red-500 rounded px-3 py-0.5">
                  <AiFillWarning />
                  <span>
                    You have reached the limit of {HOME_SETTING_OPT_ONE_LIMIT} home page banner slider.
                  </span>
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {onlySliderList?.length < HOME_SETTING_OPT_ONE_LIMIT ? (
                <NavLink to="/admin/homeslider/addhomeslider">
                  <Button className="py-2.5 rounded bg-moonstone">
                    Create
                  </Button>
                </NavLink>
              ) : (
                <Button className="py-2.5 rounded bg-red-500 cursor-not-allowed">
                  Create
                </Button>
              )}
            </div>
          </div>
        </div>
        {onlySliderList?.length > 0 ? (
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
                {onlySliderList.map((item, index) => {
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
                          <NavLink to={`/admin/homeslider/${item._id}`}>
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
                          <NavLink to={`/homeslider/update/${item._id}`}>
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
            No any banner slider data found!
          </p>
        )}
      </div>
    </>
  );
};

SliderDataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  datalist: PropTypes.array.isRequired,
  homeslidershow: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

import {
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import {
  CardHeader,
  Input,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { DateFormatter } from "./DateFormatter";
import { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import useModal from "../../hooks/useModal";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import {
  deleteCategory,
  getallCategory,
} from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UpdateCategory } from "../../screens/category/UpdateCategory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  getFeaturedCategoriesLists,
  toggleCategoryFeature,
} from "../../redux/slices/settings/SettingSlice";
import { toast } from "react-toastify";
import {
  CATEGORY_ADMIN,
  CATEGORY_GUEST,
  CATEGORY_NO_LIMIT,
} from "../../utils/constants";

const TABLE_HEAD = [
  "S.N.",
  "Title",
  "Type",
  // "Featured on home",
  "Created At",
  "Creator",
  "Cover Image",
  "Action",
];

export const CategoryDataTable = (props) => {
  useRedirectLoggedOutUser("/login");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedCategories, setUpdatedCategories] = useState(null);
  const [activeTab, setActiveTab] = useState(CATEGORY_ADMIN);

  // ### CATEGORY SEARCH & FILTER
  const filteredCategories = updatedCategories?.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ### PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 40;
  const indexOfLastCategory = currentPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const totalPages = Math.ceil(filteredCategories?.length / categoryPerPage);
  const { isSuccess } = useSelector((state) => state.category);

  const currentCategories = filteredCategories?.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const checkFeaturedOrNot = (categoryId) => {
    let isFeatured = false;
    props.FEATURED_DATA.forEach((category) => {
      if (category._id === categoryId) isFeatured = true;
    });
    return isFeatured;
  };

  useEffect(() => {
    if (
      props.TABLE_DATA &&
      props.TABLE_DATA.length > 0 &&
      props.FEATURED_DATA
    ) {
      const tempCategories = props.TABLE_DATA.map((category) => {
        return {
          ...category,
          isFeatured: checkFeaturedOrNot(category._id),
        };
      });
      setUpdatedCategories(tempCategories);
    }
  }, [props?.FEATURED_DATA, props?.TABLE_DATA, dispatch]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(props.TABLE_DATA.length / categoryPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    handleOpen();
  };

  const handleDelete = async (categoryId) => {
    await dispatch(deleteCategory(categoryId));
    await dispatch(getallCategory());
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/category");
    }
  }, [isSuccess, navigate]);

  const handleOpenUpdateDialog = (category) => {
    setSelectedCategory(category);
    setOpenUpdateDialog(true);
  };

  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  // ### CATEGORY FEATURE TOGGLE
  const handleCategoryToggle = async (resourceId, toggleState) => {
    if (
      props.FEATURED_DATA.length < 9 ||
      (props.FEATURED_DATA.length === 9 && toggleState === true)
    ) {
      await dispatch(toggleCategoryFeature(resourceId));
      await dispatch(getallCategory());
      await dispatch(getFeaturedCategoriesLists());
    } else {
      toast.error("You can't featured more than 9 categories on home page.");
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <Card className="h-full w-full shadow-lg rounded-md">
        <CardHeader floated={false} shadow={false} className="rounded-none p-1">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Categories
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about the categries that have been created.
              </Typography>
            </div>
            {props?.TABLE_DATA?.length < CATEGORY_NO_LIMIT && (
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <NavLink to="/admin/addcategory">
                  <Button className="py-2.5 rounded bg-moonstone">
                    Create
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-80 font-inter">
              <Input
                label="Search by Title"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          {/* <div className="mt-3">
            <p
              className={`font-inter text-sm ${
                props?.FEATURED_DATA?.length === 9
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              <span className="font-semibold">Note:</span> Your{" "}
              {props?.FEATURED_DATA?.length || 0} categorie(s) has been
              featured in the home page.
            </p>
          </div> */}
        </CardHeader>
        <CardBody className="p-0 w-[90vw] lg:w-[calc(100vw-350px)] overflow-x-scroll scrollbar-x-dir">
          <Tabs value={activeTab} className="px-4 mt-6">
            <TabsHeader
              className="bg-transparent bg-whitesmoke py-2"
              indicatorProps={{
                className: "bg-moonstone shadow-none !text-gray-900",
              }}
            >
              <Tab
                onClick={() => setActiveTab(CATEGORY_ADMIN)}
                value={CATEGORY_ADMIN}
                className={`${
                  activeTab === CATEGORY_ADMIN ? "text-white" : ""
                } py-2 max-w-[180px]`}
              >
                <span className="capitalize">admin</span>
              </Tab>
              <Tab
                onClick={() => setActiveTab(CATEGORY_GUEST)}
                value={CATEGORY_GUEST}
                className={`${
                  activeTab === CATEGORY_GUEST ? "text-white" : ""
                } py-2 max-w-[180px]`}
              >
                <span className="capitalize">guest</span>
              </Tab>
            </TabsHeader>
            <TabsBody className="overflow-x-scroll scrollbar-x-dir">
              <TabPanel value={CATEGORY_ADMIN} className="px-1">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD?.map((head) => (
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
                    {currentCategories
                      ?.filter(
                        (category) => category.subcategory === CATEGORY_ADMIN
                      )
                      ?.map((category, index) => {
                        const isLast = index === currentCategories?.length - 1;
                        const classes = isLast
                          ? "px-4 py-2 align-middle"
                          : "px-4 py-2 border-b border-blue-gray-50 align-middle";
                        return (
                          <tr
                            key={category?._id}
                            className="align-top even:bg-blue-gray-50/50"
                          >
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {currentPage > 1
                                    ? index + 1 + (currentPage - 1) * 10
                                    : index + 1}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold w-[180px]"
                              >
                                {category?.title}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold capitalize w-[180px]"
                              >
                                {category?.subcategory}
                              </Typography>
                            </td>
                            {/* <td className={classes}>
                        <div className="flex items-center gap-x-3 font-inter">
                          <Switch
                            onChange={() =>
                              handleCategoryToggle(
                                category?._id,
                                category?.isFeatured
                              )
                            }
                            checked={category?.isFeatured ? true : false}
                            className={` checked:bg-moonstone`}
                            circleProps={{
                              className: "border-none",
                            }}
                          />
                          <span className="capitalize text-sm text-dark">
                            {category?.isFeatured ? "Yes" : "No"}
                          </span>
                        </div>
                      </td> */}
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {<DateFormatter date={category?.createdAt} />}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold uppercase text-sm"
                              >
                                {category?.user?.name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              {category?.cover ? (
                                <button
                                  type="button"
                                  className="w-[40px] h-[40px] rounded-full overflow-hidden ms-4"
                                  onClick={() =>
                                    openModal(category?.cover?.filePath)
                                  }
                                >
                                  <img
                                    src={category?.cover?.filePath}
                                    alt={category?.title}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ) : (
                                <span className="text-sm font-medium font-inter text-dark">
                                  Image Not Found!
                                </span>
                              )}
                            </td>
                            <td className={classes}>
                              <div className="flex gap-2">
                                <IconButton
                                  onClick={() => handleViewCategory(category)}
                                  size="sm"
                                  className="rounded bg-moonstone"
                                  color="blue"
                                >
                                  <AiOutlineEye size={20} />
                                </IconButton>
                                {/* <IconButton
                                  size="sm"
                                  className="rounded"
                                  color="red"
                                  onClick={() => handleDelete(category._id)}
                                >
                                  <AiOutlineDelete size={20} />
                                </IconButton> */}
                                <IconButton
                                  size="sm"
                                  className="rounded"
                                  color="green"
                                  onClick={() =>
                                    handleOpenUpdateDialog(category)
                                  }
                                >
                                  <AiOutlineEdit size={20} />
                                </IconButton>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value={CATEGORY_GUEST} className="px-1">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD?.map((head) => (
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
                    {currentCategories
                      ?.filter(
                        (category) => category.subcategory === CATEGORY_GUEST
                      )
                      ?.map((category, index) => {
                        const isLast = index === currentCategories?.length - 1;
                        const classes = isLast
                          ? "px-4 py-2 align-middle"
                          : "px-4 py-2 border-b border-blue-gray-50 align-middle";
                        return (
                          <tr
                            key={category?._id}
                            className="align-top even:bg-blue-gray-50/50"
                          >
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {currentPage > 1
                                    ? index + 1 + (currentPage - 1) * 10
                                    : index + 1}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold w-[180px]"
                              >
                                {category?.title}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold capitalize w-[180px]"
                              >
                                {category?.subcategory}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {<DateFormatter date={category?.createdAt} />}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold uppercase text-sm"
                              >
                                {category?.user?.name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              {category?.cover ? (
                                <button
                                  type="button"
                                  className="w-[40px] h-[40px] rounded-full overflow-hidden ms-4"
                                  onClick={() =>
                                    openModal(category?.cover?.filePath)
                                  }
                                >
                                  <img
                                    src={category?.cover?.filePath}
                                    alt={category?.title}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ) : (
                                <span className="text-sm font-medium font-inter text-dark">
                                  Image Not Found!
                                </span>
                              )}
                            </td>
                            <td className={classes}>
                              <div className="flex gap-2">
                                <IconButton
                                  onClick={() => handleViewCategory(category)}
                                  size="sm"
                                  className="rounded bg-moonstone"
                                  color="blue"
                                >
                                  <AiOutlineEye size={20} />
                                </IconButton>
                                {/* <IconButton
                                  size="sm"
                                  className="rounded"
                                  color="red"
                                  onClick={() => handleDelete(category._id)}
                                >
                                  <AiOutlineDelete size={20} />
                                </IconButton> */}
                                <IconButton
                                  size="sm"
                                  className="rounded"
                                  color="green"
                                  onClick={() =>
                                    handleOpenUpdateDialog(category)
                                  }
                                >
                                  <AiOutlineEdit size={20} />
                                </IconButton>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
        {props?.TABLE_DATA?.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal font-inter"
            >
              Page {currentPage} of{" "}
              {Math.ceil(props?.TABLE_DATA?.length / categoryPerPage)}
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

      {/* view the catgeory details */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="px-3 overflow-y-scroll max-h-[90vh] scrollbar-y-dir"
      >
        <DialogHeader className="text-2xl flex justify-center pb-0">
          <p className="pt-3">Category Details</p>
        </DialogHeader>
        <DialogBody className="pt-2">
          <h3 className="text-center font-medium text-base mb-3">
            The details are show below:{" "}
          </h3>
          {selectedCategory && (
            <>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <img
                    className="h-[60px] w-[60px] object-cover rounded-full"
                    src={
                      selectedCategory?.user?.avatar?.url ||
                      selectedCategory?.user?.avatar
                    }
                    alt="nature image"
                  />
                  <div>
                    <div className="">
                      <Typography variant="h6" className="uppercase text-base">
                        {selectedCategory?.user?.name}
                      </Typography>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{selectedCategory?.user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start flex-col gap-5">
                  <div className="flex md:flex-row flex-col gap-y-3 justify-between mt-1">
                    <Typography variant="h6" className="md:w-1/3">
                      Category Name
                    </Typography>
                    <Input
                      className="w-full"
                      value={selectedCategory?.title || ""}
                      readOnly
                      size="lg"
                      label="Category Name"
                    />
                  </div>
                  <div className="flex md:flex-row flex-col gap-y-3 justify-between mt-1">
                    <Typography variant="h6" className="md:w-1/3">
                      Category Type
                    </Typography>
                    <Input
                      className="w-full capitalize"
                      value={selectedCategory?.subcategory || ""}
                      readOnly
                      size="lg"
                      label="Category Name"
                    />
                  </div>
                  {/* <div className="flex md:flex-row flex-col gap-y-3 justify-between mt-1">
                    <Typography variant="h6" className="w-1/3">
                      Created At
                    </Typography>
                    <Input
                      className="w-full"
                      value={selectedCategory?.createdAt}
                      readOnly
                      size="lg"
                      label="Created At"
                    />
                  </div> */}
                  <div className="flex md:flex-row flex-col gap-y-3 justify-between mt-1">
                    <Typography variant="h6" className="w-1/3">
                      Category Image
                    </Typography>
                    <img
                      src={selectedCategory?.cover?.filePath}
                      alt=""
                      className="w-full h-[280px] rounded-xl object-cover"
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

      {selectedCategory && (
        <UpdateCategory
          open={openUpdateDialog}
          onClose={() => {
            setOpenUpdateDialog(false);
            setSelectedCategory(null);
          }}
          category={selectedCategory}
        />
      )}
    </>
  );
};

CategoryDataTable.propTypes = {
  showViewBtn: PropTypes.any,
  TABLE_HEAD: PropTypes.any,
  TABLE_DATA: PropTypes.any,
  FEATURED_DATA: PropTypes.any,
};

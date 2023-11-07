import {
  Card,
  Input,
  Button,
  Typography,
  CardBody,
  CardHeader,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getallCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { DateFormatter } from "../../components/common/DateFormatter";
import ImageViewer from "../../components/common/ImageViewer";
import useModal from "../../hooks/useModal";
import { useEffect } from "react";

const TABLE_HEAD = [
  "S.N.",
  "Title",
  "Created At",
  "Creator",
  "Modal Image",
  "Action",
];

export const ManageModal = () => {
  useRedirectLoggedOutUser("/login");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(null);
  const [title, setTitle] = useState("Modal");
  const [previewImage, setPreviewImage] = useState(null);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const onClose = () => setOpenUpdateDialog(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { isSuccess, isLoading } = useSelector((state) => state.category);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const tempData = categories.filter(
        (category) => category.title === title
      );
      setModalData(tempData);
    }
  }, [categories, title]);

  const isImageValid = (file) => {
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    return allowedFormats.includes(file.type);
  };

  // ### MODAL CREATION
  const create = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);

    if (image) {
      formData.append("cover", image);
      await dispatch(createCategory(formData));
      await dispatch(getallCategory());
    } else {
      toast.error("Please select a modal image.");
    }
    if (isSuccess) {
      setPreviewImage(null);
      setImage(null);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isImageValid(selectedFile)) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select a valid PNG, JPEG, or JPG image.");
    }
  };

  const handleEditOpen = (categoryId) => {
    setOpenUpdateDialog(true);
    setCategoryId(categoryId);
    setImage(null);
  };

  // ### MODAL UPDATION
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);

    if (image) {
      formData.append("cover", image);
      await dispatch(
        updateCategory({
          formData: formData,
          id: categoryId,
        })
      );
      await dispatch(getallCategory());
      setOpenUpdateDialog(false);
    } else {
      toast.error("Please select a modal image.");
    }

    if (isSuccess) {
      setPreviewImage(null);
      setImage(null);
    }
  };

  // ### MODAL DELETION
  const handleDelete = async (categoryId) => {
    await dispatch(deleteCategory(categoryId));
    await dispatch(getallCategory());
  };

  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      {isLoading && <Loader />}

      {modalData?.length === 0 && (
        <Card
          color="transparent"
          className="py-6 px-5 my-10 shadow bg-white w-full"
          shadow={false}
        >
          <Typography variant="h4" color="blue-gray">
            Add Modal Image
          </Typography>
          {isLoading && <Loader />}

          <form
            onSubmit={create}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 font-inter"
          >
            <div className="mb-4 flex flex-col gap-6">
              <input
                className="block w-full text-sm text-gray-900 border border-dark-blue/50 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
                type="file"
                name="cover"
                onChange={handleImageChange}
              />
            </div>

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 max-w-xs max-h-32 rounded"
              />
            )}

            <Button
              type="submit"
              className="mt-6 text-sm bg-moonstone rounded"
              fullWidth
            >
              Add
            </Button>
          </form>
        </Card>
      )}

      {modalData?.length > 0 && (
        <Card className="h-full w-full mt-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none p-1"
          >
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Manage Popup Modal
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  {modalData?.length > 0 ? (
                    <span>
                      See information about the popup modal that appears in the
                      site. <br />
                      <span className="text-sm opacity-80 text-moonstone">
                        *You can add only one modal image.
                      </span>
                    </span>
                  ) : (
                    "No popup image!"
                  )}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0 w-[90vw] lg:w-[calc(100vw-350px)] overflow-x-scroll scrollbar-x-dir">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD?.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-5"
                    >
                      <Typography
                        color="blue-gray"
                        className="font-medium text-dark uppercase"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modalData?.map((category, index) => {
                  const isLast = index === categories?.length - 1;
                  const classes = isLast
                    ? "px-4 py-2 align-middle"
                    : "px-4 py-2 border-b border-blue-gray-50 align-middle";
                  return (
                    <tr key={category?._id} className="align-top">
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
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
                            className="w-[50px] h-[50px] rounded-full overflow-hidden ms-4"
                            onClick={() => openModal(category?.cover?.filePath)}
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
                            onClick={() => handleDelete(category._id)}
                            size="sm"
                            className="rounded"
                            color="red"
                          >
                            <AiOutlineDelete size={20} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditOpen(category._id)}
                            size="sm"
                            className="rounded"
                            color="green"
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
          </CardBody>
        </Card>
      )}

      {/* Modal update dialog */}
      <Dialog open={openUpdateDialog} onClose={onClose}>
        {isLoading && <Loader />}
        <DialogHeader>Update Popup Modal</DialogHeader>
        <DialogBody className="font-inter">
          <div>
            <label className="font-semibold text-dark block mb-4">
              Select New Image
            </label>
            <Input
              size="lg"
              type="file"
              name="cover"
              onChange={handleImageChange}
              label="Select Modal Image"
              className="py-[9px]"
            />
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 max-w-xs max-h-32 rounded"
            />
          )}
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button onClick={onClose} className="rounded">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-moonstone rounded"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

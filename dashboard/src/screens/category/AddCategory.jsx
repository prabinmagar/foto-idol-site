import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  getallCategory,
} from "../../redux/slices/categorySlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import { CATEGORY_ADMIN, CATEGORY_GUEST } from "../../utils/constants";

export const AddCategory = () => {
  useRedirectLoggedOutUser("/login");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { isSuccess, isLoading } = useSelector((state) => state.category);

  const handleTitleChange = (title) => {
    if (title.toLowerCase().includes("modal")) {
      toast.error(
        "Modal can't be your category name. Please choose another name."
      );
    } else {
      setTitle(title);
    }
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e);
  };

  const handleCreate = async () => {
    if (title.trim().length > 0 && image && subCategory) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subcategory", subCategory);
      formData.append("cover", image);
      await dispatch(createCategory(formData));
      await dispatch(getallCategory());
      if (isSuccess) {
        setPreviewImage(null);
        setImage(null);
      }
      navigate("/admin/category");
    } else {
      toast.error("Please fill all input fields.");
    }
  };

  const isImageValid = (file) => {
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    return allowedFormats.includes(file.type);
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

  return (
    <>
      {isLoading && <Loader />}
      <Card
        color="transparent"
        className="py-6 px-5 my-10 shadow bg-white w-full"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Add Category
        </Typography>

        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 font-inter">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Category Name"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            <Select
              className="capitalize"
              label="Category Type"
              value={subCategory}
              onChange={handleSubCategoryChange}
            >
              <Option className="capitalize" value={CATEGORY_ADMIN}>
                {CATEGORY_ADMIN}
              </Option>
              <Option className="capitalize" value={CATEGORY_GUEST}>
                {CATEGORY_GUEST}
              </Option>
            </Select>
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
            type="button"
            className="mt-6 text-sm bg-moonstone rounded"
            fullWidth
            onClick={handleCreate}
          >
            Add
          </Button>
        </div>
      </Card>
    </>
  );
};

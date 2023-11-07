import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  getallCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { isImageValid } from "../../utils/ImageUtils";
import { toast } from "react-toastify";
import { CATEGORY_ADMIN, CATEGORY_GUEST } from "../../utils/constants";

export const UpdateCategory = ({ open, onClose, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { isSuccess, isLoading } = useSelector((state) => state.category);
  const [previewImage, setPreviewImage] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({
    title: category.title,
    subcategory: category.subcategory,
  });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isImageValid(selectedFile)) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select a valid PNG, JPEG, or JPG image.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSubCategoryChange = (e) => {
    setUpdatedCategory({
      ...updatedCategory,
      subcategory: e,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("title", updatedCategory.title);
      formData.append("subcategory", updatedCategory.subcategory);
      if (image) {
        formData.append("cover", image);
      }

      await dispatch(
        updateCategory({
          formData: formData,
          id: category?._id,
        })
      );

      if (isSuccess) {
        await dispatch(getallCategory());
        setImage([]);
      }
      onClose();
    } else {
      toast.error("Please choose an image.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/category");
    }
  }, [dispatch, navigate, isSuccess]);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        {isLoading && <Loader />}
        <DialogHeader>Update Category</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">
              Category Title
            </label>
            <Input
              type="text"
              name="title"
              value={updatedCategory.title}
              onChange={handleChange}
              label="Category Title"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">
              Category Title
            </label>
            <Select
              className="capitalize"
              label="Category Type"
              value={updatedCategory.subcategory}
              onChange={handleSubCategoryChange}
            >
              <Option className="capitalize" value={CATEGORY_ADMIN}>
                {CATEGORY_ADMIN}
              </Option>
              <Option className="capitalize" value={CATEGORY_GUEST}>
                {CATEGORY_GUEST}
              </Option>
            </Select>
          </div>
          <div>
            <label className="font-semibold text-dark block mb-2">
              Select New Image
            </label>
            <Input
              size="lg"
              type="file"
              name="cover"
              onChange={handleImageChange}
              label="Select Image"
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
            onClick={handleSubmit}
          >
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

UpdateCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
  }).isRequired,
};

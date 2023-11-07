import { AiFillCloseCircle } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import SpinLoader from "../SpinLoader";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  getSinglePost,
  selectSinglePost,
} from "../../../redux/slices/postsSlice";
import {
  getallResource,
  updateResource,
} from "../../../redux/slices/resourceSlice";
import { getallCategory } from "../../../redux/slices/categorySlice";

const PostEdit = ({ open, handleEditDialog, postSlug }) => {
  const dispatch = useDispatch();

  // ### POST UPDATION
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    updatedAssetsCount: 0,
  });

  const [singlePost, setSinglePost] = useState({});
  const [resourceImages, setResourceImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { isSuccess, isUpdateLoading } = useSelector((state) => state.resource);
  const post = useSelector(selectSinglePost);
  const categories = useSelector((state) => state.category.categorys.categorys);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const categoryChangeHandler = (e) => {
    setFormData((prevValue) => {
      return {
        ...prevValue,
        category: e.target.value,
      };
    });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length === formData.updatedAssetsCount) {
      setResourceImages(selectedImages);
      const previews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(previews);
    } else {
      toast.error(
        `Number of images didn't match as before. It must be ${formData.updatedAssetsCount} image(s).`
      );
    }
  };

  useEffect(() => {
    if (post) {
      setSinglePost(post);
      setFormData({
        title: post?.title || "",
        description: post?.description || "",
        category: post?.category?._id,
        updatedAssetsCount: post?.assets?.length || 0,
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, updatedAssetsCount } = formData;
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("title", title);
    formDataToSubmit.append("description", description);
    formDataToSubmit.append("category", category);

    resourceImages.forEach((image) => {
      formDataToSubmit.append("assets", image);
    });

    for (let i = 0; i < updatedAssetsCount; i++) {
      formDataToSubmit.append("updatedAssets", i);
    }

    if (resourceImages.length === formData.updatedAssetsCount) {
      try {
        await dispatch(
          updateResource({ formData: formDataToSubmit, id: singlePost?._id })
        );

        if (isSuccess) {
          setFormData({
            title: "",
            description: "",
            category: "",
            updatedAssetsCount: 0,
          });
          setResourceImages([]);
          setImagePreviews([]);
          // navigate("/admin/images");
          await dispatch(getallResource());
        }
        // await dispatch(getSinglePost(postSlug));
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleEditModalClose = () => {
    handleEditDialog(false);
    setResourceImages([]);
    setImagePreviews([]);
  };

  useEffect(() => {
    dispatch(getSinglePost(postSlug));
    dispatch(getallCategory());
  }, [postSlug, dispatch]);

  return (
    <div>
      <Dialog open={open} handler={handleEditModalClose}>
        <DialogHeader className="flex items-center justify-between md:px-6">
          <p className="text-xl">Change Post Details</p>
          <button onClick={() => handleEditModalClose()}>
            <AiFillCloseCircle size={28} />
          </button>
        </DialogHeader>
        <DialogBody
          divider
          className="h-[540px] sm:px-6 lg:px-8 py-8 overflow-x-hidden scrollbar-y-dir rounded-lg"
        >
          <form onSubmit={handleSubmit} className="mt-5 font-inter">
            <div className="mb-4 flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3 placeholder:text-dark/40"
                placeholder="Title or Event ..."
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />

              <select
                value={formData.category}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3"
                onChange={categoryChangeHandler}
              >
                {categories?.length > 0 &&
                  categories?.map((category) => {
                    return (
                      <option key={category?._id} value={category?._id}>
                        {category?.title}
                      </option>
                    );
                  })}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write some description"
                className="min-h-[100px] border-[1px] border-dark/40 resize-none rounded focus:outline-none p-3  placeholder:text-dark/40"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />
              <div className="font-medium mt-3">
                You can change{" "}
                <span className="bg-dark text-white text-sm w-[24px] h-[24px] inline-flex items-center justify-center rounded-full mx-1">
                  {formData.updatedAssetsCount}
                </span>{" "}
                image(s).
              </div>
              <input
                key={imagePreviews.length}
                multiple
                type="file"
                name="assets"
                onChange={handleImageChange}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-[5.5px]"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />

              {imagePreviews.length > 0 &&
              imagePreviews.length === formData.updatedAssetsCount ? (
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Image ${index}`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-inter text-moonstone mt-2">
                  No Images selected right now!
                </p>
              )}
            </div>

            <div>{isUpdateLoading && <SpinLoader />}</div>

            <Button
              type="submit"
              className="mt-6 text-base bg-moonstone font-medium tracking-[3px]"
              fullWidth
            >
              update now
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PostEdit;

PostEdit.propTypes = {
  open: PropTypes.bool,
  handleEditDialog: PropTypes.func,
  postSlug: PropTypes.string,
};

import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { createAbout } from "../../../redux/slices/aboutSlice";

// const initialState = {
//   title: "",
// };

export const AddAbout = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [formData, setformData] = useState(initialState);
  const [imageAbout, setImageAbout] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { isCreateSuccess, isLoading } = useSelector((state) => state.about);
  // const [description, setDescription] = useState("");
  // const { title } = formData;

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setformData({ ...formData, [name]: value });
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setImageAbout(file);
        setImagePreviews(URL.createObjectURL(file));
      } else {
        toast.error(
          "Invalid file format. Please select a PNG, JPEG, or JPG file."
        );
        e.target.value = "";
        setImageAbout(null);
        setImagePreviews([]);
      }
    }
  };

  const create = async (e) => {
    e.preventDefault();
    if (imageAbout) {
      const formData = new FormData();
      // formData.append("title", title);
      // formData.append("description", description);
      if (imageAbout) {
        formData.append("cover", imageAbout);
      }

      await dispatch(createAbout(formData));
      if (isCreateSuccess) {
        navigate("/admin/about");
        setImageAbout(null);
        setImagePreviews([]);
      }
    } else {
      toast.error("Please choose an image.");
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      navigate("/admin/about");
    }
  }, [dispatch, navigate, isCreateSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      <Card className="p-8 mt-5 font-inter">
        <NavLink to="/admin/about">
          <Button className="rounded">Back to table</Button>
        </NavLink>
        <br />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Typography variant="h4" color="blue-gray" className="mb-5">
              Create About
            </Typography>

            <form onSubmit={create}>
              <div className="mb-4 flex flex-col gap-5">
                {/* <Input
                  size="lg"
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                /> */}
                {/* <Textarea
                  size="lg"
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                /> */}
                {/* <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                /> */}
                <div>
                  <Input
                    size="lg"
                    type="file"
                    label="Cover"
                    onChange={handleImageChange}
                  />
                  <span className="text-[13px] text-moonstone block mt-2">
                    {" "}
                    * Cover image must be in PNG, JPEG, or JPG format. *
                  </span>
                </div>
                {imagePreviews.length > 0 && (
                  <img
                    src={imagePreviews}
                    alt="profileImg"
                    className="h-40 object-contain rounded-xl border p-3"
                  />
                )}
              </div>
              <Button type="submit" className="bg-moonstone rounded">
                Create
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </>
  );
};

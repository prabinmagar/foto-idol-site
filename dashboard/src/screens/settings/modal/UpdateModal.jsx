import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllhomeSlider,
  gethomeSlider,
  selectHomeSlider,
  updatehomeSlider,
} from "../../../redux/slices/settings/homeSliderSlice";
import Loader from "../../../components/common/Loader";

export const UpdateModal = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const homeSlideEdit = useSelector(selectHomeSlider);
  const [formData, setformData] = useState(homeSlideEdit);

  const [imageHome, setImageHome] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { isSuccess, isLoading } = useSelector((state) => state.homeslider);

  useEffect(() => {
    dispatch(gethomeSlider(id));
  }, [dispatch, id]);

  useEffect(() => {
    setformData(homeSlideEdit);
    setImagePreviews(
      homeSlideEdit && homeSlideEdit.cover
        ? `${homeSlideEdit.cover.filePath}`
        : null
    );
  }, [homeSlideEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageHome(e.target.files[0]);
    setImagePreviews(URL.createObjectURL(e.target.files[0]));
  };

  const update = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("subtitle", formData.subtitle);
    updatedFormData.append("description", formData.description);

    if (imageHome) {
      updatedFormData.append("cover", imageHome);
    }

    await dispatch(updatehomeSlider({ id, formData: updatedFormData }));
    await dispatch(getAllhomeSlider());
    if (isSuccess) {
      navigate("/admin/homeslider");
    }
  };

  return (
    <>
    {
      isLoading && <Loader />
    }
      <Card className="p-8 mt-5 font-inter">
        <NavLink to="/admin/modal">
          <Button className="rounded">Back to table</Button>
        </NavLink>
        <br />
        <Typography variant="h4" color="blue-gray" className="mb-10">
          Update Popup Modal
        </Typography>
        <form className="flex gap-20" onSubmit={update}>
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1000px]">
            <div className="lg:w-1/2 max-w-[500px]">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Title"
                  name="title"
                  value={formData?.title || ""}
                  onChange={handleInputChange}
                />
                <Input
                  size="lg"
                  label="Sub Title"
                  name="subtitle"
                  value={formData?.subtitle || ""}
                  onChange={handleInputChange}
                />
                <Input
                  size="lg"
                  label="Sub Title"
                  name="subtitle"
                  value={formData?.category || ""}
                  disabled
                />
                <Textarea
                  size="lg"
                  label="Description"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleInputChange}
                />

                <Button type="submit" className="bg-moonstone rounded">
                  Update
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 max-w-[500px]">
              <div>
                <Input
                  size="lg"
                  type="file"
                  label="Cover"
                  onChange={handleImageChange}
                  className="py-[9px]"
                />
                <span className="text-[12px] text-moonstone">
                  {" "}
                  * Cover image must be in PNG, JPEG, or JPG format. *
                </span>
              </div>
              {imagePreviews && (
                <div className="w-full h-[300px]">
                  <img
                    src={imagePreviews}
                    alt="profileImg"
                    className="w-full h-full object-cover rounded-lg mt-3"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

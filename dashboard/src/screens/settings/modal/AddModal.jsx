import {
  Alert,
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHomeSlider } from "../../../redux/slices/settings/homeSliderSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import { HOME_SETTING_OPT_TWO } from "../../../utils/constants";

const initialState = {
  title: "",
  subtitle: "",
  description: "",
};

export const AddModal = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState(initialState);
  const [category, setCategory] = useState(`${HOME_SETTING_OPT_TWO}`);
  const [imageHome, setImageHome] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { isSuccess, isLoading } = useSelector((state) => state.homeslider);
  const { title, subtitle, description } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setImageHome(file);
        setImagePreviews(URL.createObjectURL(file));
      } else {
        toast.error(
          "Invalid file format. Please select a PNG, JPEG, or JPG file."
        );
        e.target.value = "";
        setImageHome([]);
        setImagePreviews([]);
      }
    }
  };
  const handleSelectChange = (selectedValue) => {
    setCategory(selectedValue);
  };
  const create = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);

    if (imageHome) {
      formData.append("cover", imageHome);
    }

    await dispatch(createHomeSlider(formData));
    if (isSuccess) {
      navigate("/admin/modal");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card className="p-8 mt-5 font-inter">
        <NavLink to="/admin/modal">
          <Button className="rounded">Back to table</Button>
        </NavLink>
        <br />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Typography variant="h4" color="blue-gray" className="mb-5">
              Create Modal
            </Typography>

            <form onSubmit={create}>
              <div className="mb-4 flex flex-col gap-5">
                <Input
                  size="lg"
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  size="lg"
                  label="Sub Title"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  required
                />
                <Select
                  label="Select Category"
                  size="lg"
                  value={category}
                  onChange={handleSelectChange}
                  disabled
                >
                  <Option value={HOME_SETTING_OPT_TWO}>
                    {HOME_SETTING_OPT_TWO}
                  </Option>
                  <Option disabled className="hidden">
                    {""}
                  </Option>
                </Select>
                <Textarea
                  size="lg"
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <Input
                    size="lg"
                    type="file"
                    label="Cover"
                    onChange={handleImageChange}
                    required
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
          <div className="lg:w-1/2">
            <Typography variant="h4" color="blue-gray" className="mb-4">
              Guidelines
            </Typography>

            <ul>
              {guildlinedata.map((item, index) => (
                <Alert
                  key={index}
                  variant="outlined"
                  className="mb-2 text-[12px] border-dark/30"
                  icon={<AiOutlineInfoCircle size={20} />}
                >
                  <Typography className="font-semibold text-dark text-sm font-inter">
                    {item.title}
                  </Typography>
                  <ul className="mt-2">
                    <li className="flex items-start text-[14px] opacity-80 font-inter">
                      {item.desc}
                    </li>
                  </ul>
                </Alert>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

const guildlinedata = [
  {
    title: "Category Based Display",
    desc: "If an admin user selects the category 'Creatives,' the post will be displayed in the 'Creative' section. If the category is 'Home Slider,' the post will appear on the Home Slider page.",
  },
  {
    title: "Title and Category Duplicate Check:",
    desc: "If a admin user enters a same title with category that already exist, you may see an error message.",
  },
  {
    title: "Content Document Count Check:",
    desc: "If there are already 6 or more post or content with the same category, you may see an error message.",
  },
  {
    title: "Cover Image Format Check:",
    desc: "If the selected cover image is not in PNG, JPEG, or JPG format, you may see an error message.",
  },
  {
    title: "Creative Image Dimensions Check:",
    desc: "If the selected category is  'Creatives' and the uploaded image dimensions exceed 550x550 pixels, you may see an error message.",
  },
];

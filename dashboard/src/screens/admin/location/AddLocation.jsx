import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import "react-quill/dist/quill.snow.css";
import { createLocation } from "../../../redux/slices/aboutSlice";

export const AddLocation = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const { isCreateSuccess, isLoading } = useSelector((state) => state.about);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const create = async (e) => {
    e.preventDefault();

    if (formData.name.trim() === "" || formData.address.trim() === "") {
      toast.error("Name and address cannot be empty.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone must be a 10-digit number");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await dispatch(createLocation(formData));
      if (isCreateSuccess) {
        navigate("/admin/location");
        setFormData({
          name: "",
          address: "",
          phone: "",
          email: "",
        });
      }
      navigate("/admin/location");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // useEffect(() => {
  //   if (isCreateSuccess) {
  //     navigate("/admin/location");
  //   }
  // }, [dispatch, navigate, isCreateSuccess]);

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
              Add Location
            </Typography>

            <form onSubmit={create}>
              <div className="mb-4 flex flex-col gap-5">
                <Input
                  size="lg"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 flex flex-col gap-5">
                <Input
                  size="lg"
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 flex flex-col gap-5">
                <Input
                  size="lg"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 flex flex-col gap-5">
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import { toast } from "react-toastify";
import { getAllLocation, updateLocation } from "../../../redux/slices/aboutSlice";
import "react-quill/dist/quill.snow.css";

export const UpdateLocation = ({
  openLocationUpdate,
  onLocationUpdateClose,
  location,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUpdateSuccess, isLoading } = useSelector((state) => state.about);
  const [updatedLocation, setUpdatedLocation] = useState({
    name: location.name,
    address: location.address,
    email: location.email,
    phone: location.phone,
  });

  useEffect(() => {
    setUpdatedLocation({
      name: location.name,
      address: location.address,
      email: location.email,
      phone: location.phone,
    });
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLocation({ ...updatedLocation, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(updatedLocation);
    e.preventDefault();

    if (
      updatedLocation.name.trim() === "" ||
      updatedLocation.address.trim() === ""
    ) {
      toast.error("Name and address cannot be empty.");
      return;
    }

    if (!/^\d{10}$/.test(updatedLocation.phone)) {
      toast.error("Phone must be a 10-digit number");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(updatedLocation.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await dispatch(
        updateLocation({
          formData: updatedLocation,
          id: location?._id,
        })
      );

      if (isUpdateSuccess) {
        await dispatch(getAllLocation());
      }
      await dispatch(getAllLocation());
      onLocationUpdateClose();
      navigate("/admin/location");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  // useEffect(() => {
  //   if (isUpdateSuccess) {
  //     navigate("/admin/about");
  //   }
  // }, [dispatch, navigate, isUpdateSuccess]);

  return (
    <div>
      <Dialog open={openLocationUpdate} onClose={onLocationUpdateClose}>
        {isLoading && <Loader />}
        <DialogHeader>Update Branch</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">Name</label>
            <Input
              type="text"
              name="name"
              value={updatedLocation.name}
              onChange={handleChange}
              label="Name"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">Email</label>
            <Input
              type="text"
              name="email"
              value={updatedLocation.email}
              onChange={handleChange}
              label="Email"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">Phone</label>
            <Input
              type="text"
              name="phone"
              value={updatedLocation.phone}
              onChange={handleChange}
              label="Phone Number"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-dark block mb-2">
              Address
            </label>
            <Input
              type="text"
              name="title"
              value={updatedLocation.address}
              onChange={handleChange}
              label="Address"
            />
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button onClick={onLocationUpdateClose} className="rounded">
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

UpdateLocation.propTypes = {
  openLocationUpdate: PropTypes.bool.isRequired,
  onLocationUpdateClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

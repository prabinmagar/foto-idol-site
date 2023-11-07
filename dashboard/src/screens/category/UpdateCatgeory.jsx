import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { updateCategory } from "../../redux/slices/categorySlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const UpdateCatgeory = ({ open, onClose, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.category);
  const [updatedCategory, setUpdatedCategory] = useState({ title: category.title });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSubmit = () => {
    const updatedData = { id: category._id, title: updatedCategory.title };
    dispatch(updateCategory(updatedData));
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/category");
    }
  }, [dispatch, navigate, isSuccess]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Update Category</DialogHeader>
      <DialogBody>
        <div className="mb-4">
          <label className="text-gray-700">Category Title</label>
          <Input type="text" name="title" value={updatedCategory.title} onChange={handleChange} />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button color="green" type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

updateCategory.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

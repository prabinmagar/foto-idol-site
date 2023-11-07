import { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getallCategory } from "../../redux/slices/categorySlice";
import Loader from "./Loader";

export const CategoryDropDown = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  const { categorys, loading } = useSelector((state) => state?.category);

  const allCateory = categorys?.categorys?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  const handleChange = (selectedOption) => {
    props.onChange(selectedOption);
  };

  return <>{loading ? <Loader /> : <Select onChange={handleChange} id="category" options={allCateory} value={props.value} />}</>;
};

import { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { getallCategory } from "../../redux/slices/categorySlice";
import Loader from "./Loader";

export const CategoryDropDown = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  const storeData = useSelector((state) => state?.category);
  const { loading, categorys } = storeData;

  const CATEGORIES = [
    {
      label: "Half-Body Portrait",
      value: "Half-Body Portrait"
    },
    {
      label: "Full-Body Portrait",
      value: "Full-Body Portrait"
    },
    {
      label: "Landscape",
      value: "Landscape"
    }
  ];

  // const allCateory = categorys?.categorys?.map((category) => {
  //   return {
  //     label: category?.title,
  //     value: category?._id,
  //   };
  // });

  const handleChange = (selectedOption) => {
    props.onChange(selectedOption);
  };

  return <>{loading ? <Loader /> : <Select onChange={handleChange} id="category" options={CATEGORIES} className="capitalize font-inter" value={props.value} placeholder="Select Category" />}</>;
};

CategoryDropDown.propTypes = {
  onChange: PropTypes.any,
  value: PropTypes.any
}
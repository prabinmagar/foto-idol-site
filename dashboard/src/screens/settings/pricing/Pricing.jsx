import { SliderDataTable } from "../../../components/setting/SliderDataTable";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deletehomeSlider,
  getAllhomeSlider,
} from "../../../redux/slices/settings/homeSliderSlice";
import Loader from "../../../components/common/Loader";
import { PricingDataTable } from "../../../components/setting/PricingDataTable";

const TABLE_HEAD = [
  "S.N.",
  "Created By",
  "Title",
  "Sub Title",
  "Description",
  // "Cover",
  "Category",
  "Action",
];

export const Pricing = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { contents, isLoading } = useSelector((state) => state.homeslider);

  useEffect(() => {
    dispatch(getAllhomeSlider());
  }, [dispatch]);

  const handleDelete = async (contentId) => {
    await dispatch(deletehomeSlider(contentId));
    await dispatch(getAllhomeSlider());
  };

  return (
    <>
      {isLoading && <Loader />}
      <PricingDataTable
        tableHead={TABLE_HEAD}
        datalist={contents}
        homeslidershow={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

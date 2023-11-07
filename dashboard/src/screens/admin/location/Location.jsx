import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteLocation,
  getAllLocation,
  selectAllLocation,
} from "../../../redux/slices/aboutSlice";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";
import { LocationDataTable } from "../../../components/common/LocationDataTable";

const TABLE_HEAD = [
  "S.N.",
  "Name",
  "Address",
  "Phone",
  "Email",
  "Action",
];

const Location = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const allLocation = useSelector(selectAllLocation);

  useEffect(() => {
    dispatch(getAllLocation());
  }, [dispatch]);

  const handleDelete = async (deleteId) => {
    await dispatch(deleteLocation(deleteId));
    await dispatch(getAllLocation());
  };

  return (
    <div className="flex flex-col py-5">
      {allLocation?.data && (
        <LocationDataTable
          tableHead={TABLE_HEAD}
          datalist={allLocation.data}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Location;

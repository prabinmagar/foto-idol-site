import { useDispatch, useSelector } from "react-redux";
import { AboutDataTable } from "../../../components/common/AboutDataTable";
import { useEffect } from "react";
import {
  deleteAbout,
  getAllAbout,
  selectAllAbout,
} from "../../../redux/slices/aboutSlice";
import useRedirectLoggedOutUser from "../../../utils/useRedirectLoggedOutUser";

const TABLE_HEAD = [
  "S.N.",
  // "Title",
  // "Description",
  "About Image",
  "Created On",
  "Action",
];

const About = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const allAbout = useSelector(selectAllAbout);

  useEffect(() => {
    dispatch(getAllAbout());
  }, [dispatch]);

  const handleDelete = async (aboutId) => {
    await dispatch(deleteAbout(aboutId));
    await dispatch(getAllAbout());
  };

  return (
    <div className="flex flex-col py-5">
      {allAbout?.about && (
        <AboutDataTable
          tableHead={TABLE_HEAD}
          datalist={allAbout.about}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default About;

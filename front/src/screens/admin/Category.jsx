import { useDispatch, useSelector } from "react-redux";
import { CategoryDataTable } from "../../components/common/CategoryDataTable";
import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export function Category() {
  useRedirectLoggedOutUser("/auth/login");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categorys.categorys);

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.category.isLoading);

  return (
    <div className="flex flex-col py-5">
      {isLoading && <Loader />}
      {categories?.length > 0 ? (
        <CategoryDataTable
          tableTitle={"All Categories"}
          TABLE_DATA={categories}
        />
      ) : (
        <Typography variant="h6" color="blue-gray" className="mb-6">
          No categories found!
        </Typography>
      )}
    </div>
  );
}

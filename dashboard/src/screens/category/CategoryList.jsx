import { useDispatch, useSelector } from "react-redux";
import { CategoryDataTable } from "../../components/common/CategoryDataTable";
import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import { getFeaturedCategoriesLists } from "../../redux/slices/settings/SettingSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export function CategoryList() {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.category);
  const { featuredCategories } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(getallCategory());
    dispatch(getFeaturedCategoriesLists());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categorys.categorys);

  console.log(categories);

  useEffect(() => {
    dispatch(getallCategory());
  }, [dispatch]);

  return (
    <div className="flex flex-col py-5 bg-white mt-8 rounded-md shadow-lg px-3">
      {isLoading && <Loader />}
      {categories?.length > 0 &&
      featuredCategories &&
      featuredCategories[0]?.items ? (
        <CategoryDataTable
          tableTitle={"All Categories"}
          TABLE_DATA={categories}
          FEATURED_DATA={featuredCategories[0].items}
        />
      ) : (
        <Typography variant="h6" color="blue-gray">
          No categories found!
        </Typography>
      )}
    </div>
  );
}

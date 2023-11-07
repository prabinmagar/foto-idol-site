import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/slices/categorySlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export function CategoryEdit() {
  useRedirectLoggedOutUser("/auth/login");
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const singleCategory = useSelector(state => state.category.category);

  useEffect(() => {
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  return (
    <div className="my-6 shadow bg-white rounded-lg">
      <div className="flex-auto px-4 py-10">
        {singleCategory ? (
          <form>
            <h6 className="text-blueGray-400 mt-3 mb-6 font-bold uppercase text-dark-moonstone">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600"
                    value={singleCategory?._id}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Created At
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600"
                    value={singleCategory?.createdAt}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Title 
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singleCategory?.title}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Category added by
                  </label>
                  <input
                    type="email"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singleCategory?.user}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Updated At
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600"
                    value={singleCategory?.updatedAt}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <Button
              variant="outlined"s
              className="px-8 text-sm font-inter text-moonstone border-moonstone hover:bg-moonstone mt-8"
            >
              update category
            </Button>
          </form>
        ) : (
          "An error occurred!"
        )}
      </div>
    </div>
  );
}

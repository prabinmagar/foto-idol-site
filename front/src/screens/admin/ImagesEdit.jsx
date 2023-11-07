import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, selectSinglePost } from "../../redux/slices/postsSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export function ImagesEdit() {
  useRedirectLoggedOutUser("/auth/login");
  const { postSlug } = useParams();
  const dispatch = useDispatch();
  const singlePost = useSelector(selectSinglePost);
  const [fileList, setFileList] = useState([]);

  const handleRemoveFile = (publicId) => {
    let updatedFiles = [...fileList];
    updatedFiles = updatedFiles.filter((file) => file.publicId !== publicId);
    setFileList(updatedFiles);
  };

  useEffect(() => {
    dispatch(getSinglePost(postSlug));
    if (singlePost) {
      setFileList(singlePost?.assets);
    }
  }, [dispatch, postSlug]);

  return (
    <div className="my-6 shadow bg-white rounded-lg">
      <div className="flex-auto px-4 py-10">
        {singlePost ? (
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
                    value={singlePost?._id}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2 font-inter"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singlePost?.user}
                  />
                </div>
              </div>
              <div className="w-full px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Title / Event
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singlePost?.title}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singlePost?.slug}
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
                    value={singlePost?.createdAt}
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
                    Number of Views
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    value={singlePost?.numOfViews}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-1">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-dark-moonstone/70 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Assets Limit
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter text-gray-600"
                    value={singlePost?.assetsLimit}
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
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter resize-none text-gray-600 focus:border-gray-400 focus:bg-transparent"
                    rows="4"
                    readOnly
                    value={singlePost?.description}
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              More Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-1">
                <div className="flex mt-2">
                  {fileList?.map((asset) => (
                    <div key={fileList?.publicId} className="relative mr-2">
                      <img
                        src={asset?.filePath}
                        alt={`Uploaded ${asset?.fileName}`}
                        className="w-40 h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(asset?.publicId)}
                        className="absolute -top-3 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <Button
              variant="outlined"s
              className="px-8 text-sm font-inter text-moonstone border-moonstone hover:bg-moonstone mt-8"
            >
              update post
            </Button>
          </form>
        ) : (
          "An error occurred!"
        )}
      </div>
    </div>
  );
}

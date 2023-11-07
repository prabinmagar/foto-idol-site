import { useEffect, useState } from "react";
import { Drawer, Typography, Card, Button } from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import {
  createResource,
  getallResource,
} from "../../redux/slices/resourceSlice";
import { CategoryDropDown } from "../../components/common/DropDown";
import Loader from "./Loader";
import { RxCrossCircled } from "react-icons/rx";
import { useRef } from "react";
import { selectUser } from "../../redux/slices/authSlice";
import { getUserPosts, selectUserPosts } from "../../redux/slices/postsSlice";

const initialState = {
  title: "",
  description: "",
  category: null,
};

export const UploadBox = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRedirectLoggedOutUser("/login");
  const [resource, setResource] = useState(initialState);
  const [resourceImages, setResourceImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { title, description, category } = resource;
  const { isSuccess, isLoading } = useSelector((state) => state.resource);
  const fileInputRef = useRef(null);
  const userPosts = useSelector(selectUserPosts);
  const [openRight, setOpenRight] = useState(false);
  const { resources} = useSelector((state) => state.resource);

  const openDrawerRight = () => {
    const userPosts = resources?.posts?.filter(
      (post) => post?.user?._id === user?._id
    );

    if (user?.isVerified) {
      if (userPosts && userPosts.length < 3) {
        setOpenRight(true);
      } else {
        toast.error("Your 3 upload limit has finished!");
      }
    } else {
      toast.error("Please verify your account first to upload images.");
      navigate("/admin/account");
    }
  };
  const closeDrawerRight = () => setOpenRight(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    const invalidFiles = selectedImages.filter(
      (file) => !allowedFormats.includes(file.type)
    );

    if (invalidFiles.length === 0) {
      setResourceImages(selectedImages);
      const previews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(previews);
    } else {
      setResourceImages([]);
      toast.error(
        `Invalid file formats. Please upload only JPEG, PNG, or JPG images. Invalid files: ${invalidFiles
          .map((file) => file.name)
          .join(", ")}`
      );
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = [...resourceImages];
    updatedImages.splice(indexToDelete, 1);
    setResourceImages(updatedImages);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(indexToDelete, 1);
    setImagePreviews(updatedPreviews);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resourceImages.length === 1) {
      if (resourceImages.length > 0) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        resourceImages.forEach((image) => {
          formData.append("assets", image);
        });

        if (category) {
          formData.append("category", category.value);
        }

        try {
          await dispatch(createResource(formData));
          setResource(initialState);
          setResourceImages([]);
          setImagePreviews([]);
          navigate("/admin/images");
          closeDrawerRight();
          resetFileInput();
          await dispatch(getallResource());

          if (isSuccess) {
            setResource({
              title: "",
              description: "",
              category: null,
            });
            setResource(initialState);
          }
          await dispatch(getUserPosts());
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("Please select at least one image.");
      }
    } else {
      toast.error("You can't upload more than 3 images.");
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getallResource());
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={openDrawerRight}
        className="border-[1px] border-pink bg-pink md:px-5 px-3 md:py-2 py-1.5 rounded-md flex items-center gap-2 text-white shadow hover:shadow-lg default-transition ms-auto min-w-[160px]"
      >
        <AiOutlineCloudUpload size={18} />
        <span className="font-inter font-semibold">Upload Photo</span>
      </button>

      <Drawer
        placement="right"
        className="shadow-auth overflow-y-scroll upload-drawer"
        open={openRight}
        overlay={false}
        size={600}
      >
        <div className="py-2.5 flex justify-between gap-4 items-center px-8 border-b-[1px] border-gray-200">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            Please Select Your Photos
          </Typography>
          <button
            className="p-1.5 rounded flex items-center gap-2 text-blue-gray-900 hover:text-dark default-transition"
            onClick={closeDrawerRight}
          >
            <RxCrossCircled size={28} />
          </button>
        </div>
        <Card color="transparent" shadow={false} className="px-8 py-2">
          {isLoading && <Loader />}
          <form onSubmit={handleSubmit} className="mt-5 font-inter">
            <div className="mb-4 flex flex-col gap-5">
              <input
                type="text"
                name="title"
                value={resource.title}
                onChange={handleInputChange}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3 placeholder:text-dark/40"
                placeholder="Title or Event ..."
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />
              <CategoryDropDown
                value={category}
                onChange={(selectedCategory) =>
                  setResource({ ...resource, category: selectedCategory })
                }
              />
              <textarea
                name="description"
                value={resource.description}
                onChange={handleInputChange}
                placeholder="Write some description"
                className="min-h-[100px] border-[1px] border-dark/40 resize-none rounded focus:outline-none p-3  placeholder:text-dark/40"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              />
              {/* <input
                type="file"
                name="assets"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-[7px]"
                style={{
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              /> */}

              <Card className="shadow-none">
                <label
                  className="h-[120px] w-full border-dashed border-2 overflow-hidden relative cursor-pointer"
                  onClick={handleBoxClick}
                >
                  <div className="flex flex-col items-center justify-center pt-2">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </label>
                <input
                  name="avatar"
                  ref={fileInputRef}
                  type="file"
                  onChange={handleImageChange}
                  className="pt-[7px] hidden"
                />
              </Card>

              {imagePreviews.length > 0 ? (
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden h-[180px]"
                    >
                      <img
                        src={preview}
                        alt={`Image ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-2 shadow-lg right-2 bg-moonstone text-white rounded-full cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <RxCrossCircled size={30} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-inter text-dark-blue">
                  No Images selected right now!
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-6 text-base bg-moonstone font-medium tracking-[3px]"
              fullWidth
            >
              upload now
            </Button>
          </form>
        </Card>
      </Drawer>
    </div>
  );
};

// import { useState } from "react";
// import {
//   Drawer,
//   Typography,
//   Card,
//   Button,
// } from "@material-tailwind/react";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
// import { useNavigate } from "react-router-dom";
// import {
//   createResource,
//   getallResource,
// } from "../../redux/slices/resourceSlice";
// import { CategoryDropDown } from "../../components/common/DropDown";
// import Loader from "./Loader";
// import { RxCrossCircled } from "react-icons/rx";
// import { useRef } from "react";
// import { selectUser } from "../../redux/slices/authSlice";

// const initialState = {
//   title: "",
//   description: "",
//   category: null,
// };

// export const UploadBox = () => {
//   const user = useSelector(selectUser);
//   const navigate = useNavigate();
//   const [openRight, setOpenRight] = useState(false);
//   const openDrawerRight = () => {
//     if (user?.isVerified) {
//       setOpenRight(true);
//     } else {
//       toast.error("Please verify your account first to upload images.");
//       navigate("/admin/account");
//     }
//   };
//   const closeDrawerRight = () => setOpenRight(false);
//   const dispatch = useDispatch();

//   useRedirectLoggedOutUser("/login");
//   const [resource, setResource] = useState(initialState);
//   const [resourceImages, setResourceImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const { title, description, category } = resource;
//   const { isSuccess, isLoading } = useSelector((state) => state.resource);
//   const fileInputRef = useRef(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setResource({ ...resource, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files);
//     const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
//     const invalidFiles = selectedImages.filter(
//       (file) => !allowedFormats.includes(file.type)
//     );

//     if (invalidFiles.length === 0) {
//       setResourceImages(selectedImages);
//       const previews = selectedImages.map((image) =>
//         URL.createObjectURL(image)
//       );
//       setImagePreviews(previews);
//     } else {
//       setResourceImages([]);
//       toast.error(
//         `Invalid file formats. Please upload only JPEG, PNG, or JPG images. Invalid files: ${invalidFiles
//           .map((file) => file.name)
//           .join(", ")}`
//       );
//     }
//   };

//   const handleDeleteImage = (indexToDelete) => {
//     const updatedImages = [...resourceImages];
//     updatedImages.splice(indexToDelete, 1);
//     setResourceImages(updatedImages);

//     const updatedPreviews = [...imagePreviews];
//     updatedPreviews.splice(indexToDelete, 1);
//     setImagePreviews(updatedPreviews);
//   };

//   const resetFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (resourceImages.length <= 3) {
//       if (resourceImages.length > 0) {
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("description", description);

//         resourceImages.forEach((image) => {
//           formData.append("assets", image);
//         });

//         if (category) {
//           formData.append("category", category.value);
//         }

//         try {
//           console.log(formData);
//           await dispatch(createResource(formData));
//           setResource(initialState);
//           setResourceImages([]);
//           setImagePreviews([]);
//           navigate("/admin/images");
//           closeDrawerRight();
//           resetFileInput();
//           await dispatch(getallResource());

//           if (isSuccess) {
//             setResource({
//               title: "",
//               description: "",
//               category: null,
//             });
//             setResource(initialState);
//             setResourceImages([]);
//             setImagePreviews([]);
//             navigate("/admin/images");
//             closeDrawerRight();
//             resetFileInput();
//           }
//         } catch (error) {
//           toast.error(error);
//         }
//       } else {
//         toast.error("Please select at least one image.");
//       }
//     } else {
//       toast.error("You can't upload more than 3 images.");
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={openDrawerRight}
//         className="border-[1px] border-pink bg-pink md:px-5 px-3 md:py-2 py-1.5 rounded-md flex items-center gap-2 text-white shadow hover:shadow-lg default-transition ms-auto min-w-[160px]"
//       >
//         <AiOutlineCloudUpload size={18} />
//         <span className="font-inter font-semibold">Upload Photo</span>
//       </button>

//       <Drawer
//         placement="right"
//         className="shadow-auth overflow-y-scroll upload-drawer"
//         open={openRight}
//         overlay={false}
//         size={600}
//       >
//         <div className="py-2.5 flex justify-between gap-4 items-center px-8 border-b-[1px] border-gray-200">
//           <Typography variant="h5" color="blue-gray" className="font-medium">
//             Please Select Your Photos
//           </Typography>
//           <button
//             className="p-1.5 rounded flex items-center gap-2 text-blue-gray-900 hover:text-dark default-transition"
//             onClick={closeDrawerRight}
//           >
//             <RxCrossCircled size={28} />
//           </button>
//         </div>
//         <Card color="transparent" shadow={false} className="px-8 py-2">
//           {isLoading && <Loader />}
//           <form onSubmit={handleSubmit} className="mt-5 font-inter">
//             <div className="mb-4 flex flex-col gap-5">
//               <input
//                 type="text"
//                 name="title"
//                 value={resource.title}
//                 onChange={handleInputChange}
//                 className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-3 placeholder:text-dark/40"
//                 placeholder="Title or Event ..."
//                 style={{
//                   borderColor: "hsl(0, 0%, 80%)",
//                 }}
//               />
//               <CategoryDropDown
//                 value={category}
//                 onChange={(selectedCategory) =>
//                   setResource({ ...resource, category: selectedCategory })
//                 }
//               />
//               <textarea
//                 name="description"
//                 value={resource.description}
//                 onChange={handleInputChange}
//                 placeholder="Write some description"
//                 className="min-h-[100px] border-[1px] border-dark/40 resize-none rounded focus:outline-none p-3  placeholder:text-dark/40"
//                 style={{
//                   borderColor: "hsl(0, 0%, 80%)",
//                 }}
//               />
//               <input
//                 multiple
//                 type="file"
//                 name="assets"
//                 onChange={handleImageChange}
//                 ref={fileInputRef}
//                 className="h-[44px] border-[1px] border-dark/40 rounded focus:outline-none p-[7px]"
//                 style={{
//                   borderColor: "hsl(0, 0%, 80%)",
//                 }}
//               />
//               {imagePreviews.length > 0 ? (
//                 <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
//                   {imagePreviews.map((preview, index) => (
//                     <div
//                       key={index}
//                       className="relative rounded-lg overflow-hidden h-[180px]"
//                     >
//                       <img
//                         src={preview}
//                         alt={`Image ${index}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         className="absolute top-2 shadow-lg right-2 bg-moonstone text-white rounded-full cursor-pointer"
//                         onClick={() => handleDeleteImage(index)}
//                       >
//                         <RxCrossCircled size={30} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="font-inter text-dark-blue">
//                   No Images selected right now!
//                 </p>
//               )}
//             </div>

//             <Button
//               type="submit"
//               className="mt-6 text-base bg-moonstone font-medium tracking-[3px]"
//               fullWidth
//             >
//               upload now
//             </Button>
//           </form>
//         </Card>
//       </Drawer>
//     </div>
//   );
// };

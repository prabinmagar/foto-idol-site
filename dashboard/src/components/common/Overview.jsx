import { Card, Typography } from "@material-tailwind/react";
import {
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiFillLike,
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineFileImage,
  AiOutlineInfo,
} from "react-icons/ai";
import { BsCheck, BsClipboardCheckFill, BsImages } from "react-icons/bs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallResource } from "../../redux/slices/resourceSlice";
import { getallCategory } from "../../redux/slices/categorySlice";
import { getAllUserByAdmin, selectUser } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { current } from "@reduxjs/toolkit";

export const Overview = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.resource.resources?.posts);
  const user = useSelector(selectUser);
  const categories = useSelector((state) => state.category.categorys);
  const [totalViews, setTotalViews] = useState(0);
  const { users } = useSelector((state) => state.auth);
  const [verifiedUsers, setVerifiedUsers]  = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    if(users?.usersList?.length > 0){
      const verifiedUsers = users.usersList.filter(
        (user) => user.role !== "admin" && user.isVerified === true
      );
      setVerifiedUsers(verifiedUsers);
    }
  }, [users?.usersList?.length, users.usersList]);

  useEffect(() => {
    if(posts?.length > 0){
      const likesCount = posts.reduce((accumulator, currentPost) => accumulator + currentPost.likes.length, 0);
      setTotalLikes(likesCount);
    }
  }, [posts?.length, posts]);

  useEffect(() => {
    dispatch(getallResource()).then(() => {
      if (posts?.length > 0) {
        const tempViews = posts.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.numOfViews;
        }, 0);
        setTotalViews(tempViews);
      }
    });
    dispatch(getallCategory());
    if (user?.role === "admin") {
      dispatch(getAllUserByAdmin());
    }
  }, [dispatch, user]);

  return (
    <>
      <section className="my-8">
        <div className="items-center m-auto w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCard
              title="Total Uploads"
              currentData={posts?.length > 0 ? posts?.length : 0}
              icon={<AiOutlineFileImage size={25} />}
              description={"Photos Info"}
            />
            <OverviewCard
              title="Total Users"
              currentData={users?.totalUsers || 0}
              icon={<AiOutlineCloudUpload size={25} />}
              description={"Registered Users"}
            />
            <OverviewCard
              title="Total Views"
              currentData={totalViews || 0}
              icon={<AiOutlineEye size={25} />}
              description={"Photos views"}
            />
            <OverviewCard
              title="Categories"
              currentData={categories ? categories?.total : 0}
              icon={<BsImages size={25} />}
              description={"Photo Categories"}
            />
            <OverviewCard
              title="Verified Users"
              currentData={verifiedUsers ? verifiedUsers?.length : 0}
              icon={<BsClipboardCheckFill size={25} />}
              description={"Verified Users"}
            />
            <OverviewCard
              title="Total Likes"
              currentData={totalLikes ? totalLikes : 0}
              icon={<AiFillLike size={25} />}
              description={"Post Likes"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export const OverviewCard = (props) => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col px-4 py-6 overflow-hidden bg-white rounded-lg shadow-lg duration-300 h-[210px]">
          <div className="flex flex-row justify-between items-center">
            <div className="px-4 py-4 bg-gray-300 rounded-md bg-opacity-30">
              {props.icon}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-6">
            {props.currentData}
          </h1>
          <div className="flex flex-row justify-between mt-1 flex-wrap">
            <p className="text-gray-400 font-semibold">{props.title}</p>
            <span className="text-xs text-white bg-moonstone rounded shadow-lg inline-flex justify-center items-center px-2">
              {props.description}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

OverviewCard.propTypes = {
  title: PropTypes.any,
  currentData: PropTypes.any,
  icon: PropTypes.any,
  classes: PropTypes.string,
  description: PropTypes.string,
};

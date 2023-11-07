import { Card, Typography } from "@material-tailwind/react";
import {
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineFileImage,
} from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallResource } from "../../redux/slices/resourceSlice";
import { getallCategory } from "../../redux/slices/categorySlice";
import { getAllPost, getUserPosts, selectAllPosts, selectUserPosts } from "../../redux/slices/postsSlice";
import { selectUser } from "../../redux/slices/authSlice";

export const Overview = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectUser);
  const categories = useSelector(state => state.category.categorys);
  const [totalViews, setTotalViews] = useState(0);
  const userPosts = useSelector(selectUserPosts);

  useEffect(() => {
    dispatch(getAllPost())
    dispatch(getUserPosts())
    .then(() => {
      if(userPosts && userPosts[0]?.total > 0){
        const tempViews = userPosts && userPosts[0]?.posts?.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.numOfViews;
        }, 0);
        setTotalViews(tempViews);
      }
    })
    dispatch(getallCategory());
  }, [dispatch, user]);

  return (
    <>
      <section className="my-8">
        <Typography variant="h4" color="blue-gray" className="mb-6">
        Overview & Data
        </Typography>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            color="text-blue-300"
            title="Total Images"
            currentData={posts?.length > 0 ? posts?.length : 0}
            last="Last Month"
            pastData="100"
            icon={<AiOutlineFileImage size={25} />}
          />
          <OverviewCard
            color="text-indigo-300"
            title="Your Uploads"
            currentData={userPosts ? userPosts[0]?.total : 0}
            last="Last Month"
            pastData="100"
            icon={<AiOutlineCloudUpload size={25} />}
          />
          <OverviewCard
            color="text-red-300"
            title="Total Views"
            currentData={totalViews}
            last="Last Month"
            pastData="20"
            icon={<AiOutlineEye size={25} />}
          />
          <OverviewCard
            color="text-orange-300"
            title="Categories"
            currentData={categories ? categories?.total : 0}
            last="Last Month"
            pastData="20"
            icon={<BsImages size={25} />}
          />
        </div>
      </section>
    </>
  );
};

export const OverviewCard = (props) => {
  return (
    <>
      <Card className="border border-gray-200 flex flex-col gap-2 p-5 bg-white rounded-lg shadow-sm">
        <Typography
          variant="small"
          color="black"
          className={`font-inter text-2xl font-semibold text-gray-700 ${props.color}`}
        >
          {props.title}
        </Typography>
        <Typography variant="h5" color="black" className="font-normal">
          {props.currentData ? props.currentData : 0}
        </Typography>
        {/* <div className="flex justify-between items-center">
          <div>
            <Typography variant="small" className="font-normal text-[12px]">
              {props.last}
            </Typography>
            <Typography variant="h6" color="black" className=" font-normal">
              {props.pastData}
            </Typography>
          </div>
          <div className={`${props.color}`}>{props.icon}</div>
        </div> */}
      </Card>
    </>
  );
};

OverviewCard.propTypes = {
  title: PropTypes.any,
  currentData: PropTypes.any,
  last: PropTypes.any,
  pastData: PropTypes.any,
  color: PropTypes.any,
  icon: PropTypes.any,
};

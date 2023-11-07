import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Input,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { getallResource } from "../../redux/slices/resourceSlice";
import Loader from "../../components/common/Loader";
import { NavLink } from "react-router-dom";
import {
  getFeaturesLists,
  toggleHomeFeature,
} from "../../redux/slices/settings/SettingSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { HOME_FEATURED_SLIDER_LIMIT } from "../../utils/constants";
import { toast } from "react-toastify";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Feature = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.resource.resources.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const { features } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(getallResource());
    dispatch(getFeaturesLists());
  }, [dispatch]);

  // ### POST SEARCHING & FILTER
  const isLoading = useSelector((state) => state.resource.isLoading);
  const postsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts?.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = post.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch;
  });

  if (!posts || posts.length === 0) {
    return (
      <section className="py-6 bg-gray-100 rounded-lg my-6 px-4">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Photo Gallery
        </Typography>
        {isLoading && <Loader />}
        <p>No any images/posts found!</p>
      </section>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const postsToDisplay = filteredPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredPosts?.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="p-6 rounded-lg my-6 bg-white">
      <div className="flex justify-between items-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-xl lg:text-2xl"
        >
          Set Featured on Home Slider
        </Typography>
        <NavLink to="/admin/featured/view">
          <Button color="gray" className="mb-6 rounded">
            View Featured only
          </Button>
        </NavLink>
      </div>
      <p className="mb-4 text-base leading-relaxed text-gray-700 mt-1 font-normal">
        You have featured {(features && features[0]?.items?.length) || 0} out of{" "}
        {HOME_FEATURED_SLIDER_LIMIT} images.{" "}
        {features &&
          features[0]?.items?.length === HOME_FEATURED_SLIDER_LIMIT && (
            <span className="text-sm bg-red-500 text-white rounded px-1.5 py-1">
              {" "}
              Limited reached.
            </span>
          )}
      </p>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-8">
        <div className="w-full md:w-80">
          <Input
            label="Search by Title & Author"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="font-inter placeholder:font-inter"
          />
        </div>
      </div>
      {isLoading && <Loader />}

      {postsToDisplay?.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-4 gap-3">
          {postsToDisplay.map((post) => (
            <FeatureItem show={true} key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <Typography>No any images/posts found!</Typography>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center bg-white border-t border-blue-gray-50 px-4 py-6 mt-8 gap-4">
          <Button
            variant="outlined"
            className="rounded border-[1px] border-moonstone text-moonstone"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            className="rounded border-[1px] border-pink text-pink"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
};

export const FeatureItem = ({ post, show }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const { features } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(getFeaturesLists());
  }, [dispatch]);

  useEffect(() => {
    if (features && features.length > 0) {
      const isAdded = features.some((feature) =>
        feature.items.some((item) => item._id === post._id)
      );
      setStatus(isAdded ? "added" : "removed");
    }
  }, [features, post?._id]);

  const handleToggle = async (resourceId) => {
    const response = await dispatch(toggleHomeFeature(resourceId));
    await dispatch(getFeaturesLists());
    if (response.payload && response.payload.status) {
      setStatus(response.payload.status);
    }
  };

  const onHandleFeature = () => {
    const featuredItemsCount = (features && features[0]?.items?.length) || 0;
    if (status === "added") {
      handleToggle(post._id);
    }

    if (status === "removed") {
      if (featuredItemsCount < HOME_FEATURED_SLIDER_LIMIT) {
        handleToggle(post._id);
      } else {
        toast.error(
          `You can only feature ${HOME_FEATURED_SLIDER_LIMIT} images in the home slider.`
        );
      }
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader shadow={false} floated={false} className="m-1 h-[200px]">
          <img
            src={post?.assets && post.assets[0]?.filePath}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="m-0 p-2">
          <div className="flex items-center gap-3">
            <div>
              <Avatar
                size="sm"
                variant="circular"
                className="min-w-[36px]"
                src={post?.user?.avatar?.url || post.user?.avatar}
              />
            </div>
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className=" capitalize text-base"
              >
                {post?.title?.slice(0, 24)}
                {"..."}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {post?.user?.name}
              </Typography>
            </div>
          </div>
        </CardBody>
        {show && (
          <CardFooter className="pt-0 p-2">
            <Button
              className={`rounded ${
                status === "added" ? "bg-red-500" : "bg-moonstone"
              }`}
              fullWidth
              onClick={() => onHandleFeature()}
            >
              {status === "added" ? "Remove from Home" : "Add to Home"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

FeatureItem.propTypes = {
  post: PropTypes.any,
  show: PropTypes.any,
  _id: PropTypes.any,
};

import "react-image-gallery/styles/css/image-gallery.css";
import { staticImages } from "../../images";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { BsEye, BsShare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUserPosts,
  selectAllPosts,
  selectSearchedUserPosts,
  selectSinglePost,
} from "../../redux/slices/postsSlice";
import { getSinglePost } from "../../redux/slices/postsSlice";
import { format } from "date-fns";
import ContactInfo from "../../components/common/ContactInfo";
import Loader from "../../components/common/Loader";
import {
  getAllComment,
  selectAllComment,
} from "../../redux/slices/commentSlice";
import { scrollToTop } from "../../utils/scrollToTop";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import ProfileModal from "../../components/common/ProfileModal";
import FsLightbox from "fslightbox-react";
import { MdContentCopy, MdOutlineFullscreen } from "react-icons/md";
import {
  searchUserLinks,
  selectSearchedUserLinks,
} from "../../redux/slices/userSlice";
import { SocialIcon } from "react-social-icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  copyImageURL,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnPinterest,
  shareOnTwitter,
} from "../../utils/ShareUtils";
import { isEmptyObject } from "../../utils/helper";
import PostSidebar from "../../components/common/posts/PostSidebar";
import { CommentsForm } from "../../components/common/comments/CommentsForm";
import { Comments } from "../../components/common/comments/Comments";
import { togglePostLikes } from "../../redux/slices/resourceSlice";
import { selectUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { postSlug } = useParams();
  const posts = useSelector(selectAllPosts);
  const singlePost = useSelector(selectSinglePost);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const comments = useSelector(selectAllComment);
  const [toggler, setToggler] = useState(false);
  const userPosts = useSelector(selectSearchedUserPosts);
  const userLinks = useSelector(selectSearchedUserLinks);
  const likesStatus = useSelector((state) => state.resource.likesStatus);
  const user = useSelector(selectUser);
  const [isVisible, setIsVisible] = useState(false);
  const [IsUserLikedPost, setIsUserLikedPost] = useState(false);
  const [currentPostComment, setCurrentPostComment] = useState([]);

  // ### PROFILE MODAL TOGGLE
  const [profileOpen, setProfileOpen] = useState(false);
  const handleProfileView = () => setProfileOpen((cur) => !cur);

  // ### POST COMMENT FILTER
  useEffect(() => {
    let filteredCurrentPostComment = comments?.allComment?.filter((comment) => singlePost?._id === comment?.posts);
    setCurrentPostComment(filteredCurrentPostComment);
  }, [comments, singlePost])

  useEffect(() => {
    if (!isEmptyObject(singlePost)) {
      dispatch(getAllComment());
      dispatch(
        searchUserPosts({
          userId: singlePost.user._id,
          email: singlePost.user.email,
        })
      );
      dispatch(searchUserLinks(singlePost.user._id));
    }
  }, [singlePost, dispatch]);

  useEffect(() => {
    if (postSlug) {
      setIsUserLikedPost(false);
      dispatch(getSinglePost(postSlug));
    }
    dispatch(getallCategory());
  }, [postSlug, dispatch]);

  const checkPostLikeStatus = () => {
    if (singlePost?.likes && user?.email) {
      const tempLikesArr = singlePost?.likes.filter(
        (like) => like.email === user.email
      );
      let status = tempLikesArr.length !== 0 ? true : false;
      setIsUserLikedPost(status);
    }
  };

  useEffect(() => {
    checkPostLikeStatus();
  }, [singlePost, user]);

  const handlePostLikes = async (postId) => {
    if (postId && user?._id) {
      const toggleData = {
        postId: postId,
        userId: {
          user: {
            id: user?._id,
          },
        },
      };
      await dispatch(togglePostLikes(toggleData));
      await dispatch(getSinglePost(postSlug));
      setIsVisible(true);
    } else {
      toast.error("Please login first to like the photo!");
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible]);

  return (
    <>
      {/* share dialog */}
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            FotoIdol - Photo Share
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="pr-2 pt-0">
          <div className="mb-1">
            <Typography
              variant="small"
              color="gray"
              className="font-semibold text-dark-blue opacity-90 font-inter mb-3"
            >
              Share Image On:
            </Typography>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() =>
                  shareOnFacebook(
                    singlePost?.assets && singlePost?.assets[0]?.filePath
                  )
                }
                network="facebook"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() =>
                  shareOnTwitter(
                    singlePost?.assets && singlePost?.assets[0]?.filePath
                  )
                }
                network="twitter"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() =>
                  shareOnLinkedIn(
                    singlePost?.assets && singlePost?.assets[0]?.filePath
                  )
                }
                network="linkedin"
              />
              <SocialIcon
                className="cursor-pointer hover:scale-110 default-transition"
                onClick={() =>
                  shareOnPinterest(
                    singlePost?.assets && singlePost?.assets[0]?.filePath,
                    singlePost?.description
                  )
                }
                network="pinterest"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
          <Typography
            variant="small"
            color="gray"
            className="font-normal flex items-center cursor-pointer"
            onClick={() =>
              copyImageURL(
                singlePost?.assets && singlePost?.assets[0]?.filePath
              )
            }
          >
            <MdContentCopy className="me-2" size={20} />
            <span className="mt-1 font-inter">
              Click here to copy the image link
            </span>
          </Typography>
        </DialogFooter>
      </Dialog>

      <ProfileModal
        profileOpen={profileOpen}
        singlePost={singlePost}
        userPosts={userPosts && userPosts?.postCount}
        handleProfileView={handleProfileView}
        userLinks={userLinks}
      />

      {/* Fs lightbox */}
      <FsLightbox
        toggler={toggler}
        sources={[singlePost?.assets && singlePost?.assets[0]?.filePath]}
      />

      <div className="flex px-3 py-8 lg:py-12">
        <div className="containers w-full">
          {isLoading && <Loader />}
          <div className="grid xl:grid-cols-[auto_260px] gap-10 mt-14">
            <div className="bg-white px-4 py-2">
              <div className="lg:px-2 flex items-center flex-wrap gap-y-3 justify-between border-b-[1px] border-black/10 py-3 w-full">
                <div className="flex items-center">
                  <header>
                    <address className="flex items-center not-italic">
                      <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <div
                          className="cursor-pointer hover:scale-105 default-transition"
                          onClick={handleProfileView}
                        >
                          {singlePost?.user ? (
                            <img
                              className="mr-4 w-14 h-14 rounded-full"
                              src={
                                singlePost?.user?.avatar?.url
                                  ? singlePost?.user?.avatar?.url
                                  : singlePost?.user?.avatar
                              }
                              alt="user image"
                            />
                          ) : (
                            <img
                              className="mr-4 w-14 h-14 rounded-full"
                              src={staticImages.blank_user}
                              alt="user image"
                            />
                          )}
                        </div>
                        <div className="font-inter">
                          <a
                            rel="author"
                            className="text-lg font-bold text-gray-900 dark:text-white capitalize"
                          >
                            {singlePost?.user?.name}
                          </a>
                          <p className="text-sm text-gray-500 font-normal">
                            Uploaded on{" "}
                            {singlePost?.createdAt &&
                              format(
                                new Date(singlePost.createdAt),
                                "do MMMM, yyyy"
                              )}
                          </p>
                        </div>
                      </div>
                    </address>
                  </header>
                </div>
                <div className="flex items-center flex-wrap font-inter">
                  <p className="font-semibold lg:inline-flex items-center font-inter text-dark flex text-sm">
                    <span className="me-3 inline-flex items-center">
                      <BsEye size={18} />
                    </span>
                    <span>{singlePost?.numOfViews}</span>
                  </p>
                  <p className="ms-7 font-semibold lg:inline-flex items-center font-inter text-dark flex text-sm relative">
                    <button
                      onClick={() => handlePostLikes(singlePost?._id)}
                      className="me-3 inline-flex items-center cursor-pointer hover:scale-110 default-transition"
                    >
                      {IsUserLikedPost ? (
                        <AiFillHeart size={18} />
                      ) : (
                        <AiOutlineHeart size={18} />
                      )}
                    </button>
                    <span>
                      {singlePost?.likes ? (
                        singlePost?.likes?.length
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </span>
                    {likesStatus && isVisible && (
                      <span className="absolute top-full left-0 block w-auto whitespace-nowrap text-xs rounded font-normal bg-white shadow-md px-2 py-1.5">
                        Like {likesStatus?.status}
                      </span>
                    )}
                  </p>
                  <p className="ms-7 font-semibold text-sm lg:inline-flex items-center font-inter text-dark flex">
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="inline-flex items-center hover:text-moonstone default-transition"
                    >
                      <BsShare className="me-3" size={17} />
                      Share Photo
                    </button>
                  </p>
                </div>
              </div>
              <div className="mt-10 mb-4">
                <div className="">
                  {/* <ImageGallery
                 items={images}
                 onImageError={handleImageError}
               /> */}
                  <img
                    className="mx-auto cursor-pointer hover:scale-105 default-transition"
                    src={singlePost?.assets && singlePost?.assets[0]?.filePath}
                    alt={singlePost?.title}
                    onClick={() => setToggler(!toggler)}
                  />
                  <div className="flex justify-end my-3">
                    <button
                      type="button"
                      className="hover:text-moonstone default-transition hover:scale-125"
                    >
                      <MdOutlineFullscreen
                        title="Full screen"
                        size={28}
                        onClick={() => setToggler(!toggler)}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="image-description border-t-[1px] border-black/5 py-5 lg:px-2  font-inter">
                <h1 className="mb-2 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-4 lg:text-2xl dark:text-white">
                  {singlePost?.title}
                </h1>

                <p className="text-base text-gray-500 dark:text-gray-400">
                  {singlePost?.description}
                </p>
              </div>
              <CommentsForm postId={singlePost._id} />
              {(currentPostComment?.length > 0) ? (
                <Comments
                  comments={currentPostComment}
                  postId={singlePost._id}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-6 px-3 my-5"
                >
                  No comments found!
                </Typography>
              )}
            </div>
            {posts?.length > 0 && <PostSidebar posts={posts} />}
          </div>
        </div>
      </div>
      <ContactInfo />
    </>
  );
};

export default DetailsPage;

import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import format from "date-fns/format";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import ImageViewer from "../../components/common/ImageViewer";
import useModal from "../../hooks/useModal";
import { getallResource } from "../../redux/slices/resourceSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";

export const Gallery = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.resource.resources.posts);
  // ### IMAGE PREVIEW MODAL
  const { modalOpen, imageSrc, openModal, closeModal } = useModal();

  useEffect(() => {
    dispatch(getallResource());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.resource.isLoading);

  useEffect(() => {
    scrollToTop();
  }, []);

  const postsPerPage = 40;
  const [currentPage, setCurrentPage] = useState(1);

  if (!posts || posts.length === 0) {
    return (
      <section className="py-6 rounded-lg my-6">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Photo Gallery
        </Typography>
        {isLoading && <Loader />}
        <Typography variant="h6" color="blue-gray" className="mb-6">
          No any images/posts found!
        </Typography>
      </section>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const postsToDisplay = posts?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {modalOpen && <ImageViewer src={imageSrc} onClose={closeModal} />}
      <section className="py-6 rounded-lg my-6">
        <Typography variant="h4" className="mb-6 text-white">
          Photo Gallery
        </Typography>
        {isLoading && <Loader />}
        {postsToDisplay?.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 gap-3 md:grid-cols-3 xxl:grid-cols-5">
            {postsToDisplay?.map((post) => (
              <GalleryItem key={post._id} post={post} openModal={openModal} />
            ))}
          </div>
        ) : (
          <Typography variant="h6" color="blue-gray" className="mb-6">
            No any images/posts found!
          </Typography>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center px-4 py-6 mt-8 gap-4">
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
    </>
  );
};

export const GalleryItem = (props) => {
  const onOpenClick = () => {
    props?.openModal(props?.post?.assets && props?.post?.assets[0]?.filePath);
  };
  return (
    <article className="bg-white rounded-md p-1.5 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 cursor-pointer">
      <div onClick={onOpenClick}>
        <div className="relative flex items-end overflow-hidden h-[200px] rounded">
          <img
            src={props?.post?.assets && props?.post?.assets[0]?.filePath}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-1 p-1 flex justify-between items-end flex-wrap gap-x-2">
          <Typography className="font-inter font-semibold text-sm capitalize">
            {props?.post?.user?.name}
          </Typography>
          <p className="text-gray-800 font-inter text-xs">
            {props?.post?.createdAt &&
              format(new Date(props?.post?.createdAt), "do MMMM, yyyy")}
          </p>
        </div>
      </div>
    </article>
  );
};

GalleryItem.propTypes = {
  post: PropTypes.any,
  openModal: PropTypes.func,
};

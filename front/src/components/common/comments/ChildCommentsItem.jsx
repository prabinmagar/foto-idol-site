import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllComment,
} from "../../../redux/slices/commentSlice";
import { selectUser } from "../../../redux/slices/authSlice";
import { staticImages } from "../../../images";
import { formatDateToTimeAgo } from "../../../utils/DateUtils";

export const ChildCommentsItem = ({ childComment }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isChildActionBtnsVisible, setIsChildActionBtnsVisible] =
    useState(false);
  const childActionBtnsRef = useRef(null);

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(childComment?._id));
    await dispatch(getAllComment());
  };

  const handleOutsideClick = (e) => {
    if (
      childActionBtnsRef.current &&
      !childActionBtnsRef.current.contains(e.target)
    ) {
      setIsChildActionBtnsVisible(false);
    }
  };

  const handleChildActionClick = () => {
    setIsChildActionBtnsVisible(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const avatarUrl = useMemo(() => {
    if (childComment.user) {
      return childComment.user.avatar?.url || childComment.user.avatar;
    } else {
      return staticImages.blank_user;
    }
  }, [childComment.user]);

  return (
    <article
      key={childComment?._id}
      className="py-2 mx-3 ps-4 text-base rounded-lg dark:bg-gray-900 font-inter"
    >
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img className="mr-2 w-8 h-8 rounded-full" src={avatarUrl} alt="" />
          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
            {!childComment?.user ? "Anonymous" : childComment?.user?.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span>{formatDateToTimeAgo(childComment?.createdAt)}</span>
          </p>
        </div>
        {childComment?.user?._id === user?._id && (
          <div
            className="inline-flex relative items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 default-transition"
            onClick={handleChildActionClick}
            type="button"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            {isChildActionBtnsVisible && (
              <div
                className=" z-10 w-[120px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-full"
                ref={childActionBtnsRef}
              >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      className="block w-full py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white default-transition"
                      onClick={() => handleDeleteComment(childComment?._id)}
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </footer>
      <p className="text-sm text-dark/90">{childComment?.content}</p>
    </article>
  );
};

ChildCommentsItem.propTypes = {
  childComment: PropTypes.object,
};

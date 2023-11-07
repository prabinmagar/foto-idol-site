import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import {
  createChildComment,
  deleteComment,
  getAllComment,
} from "../../../redux/slices/commentSlice";
import { staticImages } from "../../../images";
import { formatDateToTimeAgo } from "../../../utils/DateUtils";
import { ChildCommentsItem } from "./ChildCommentsItem";
import { Button } from "@material-tailwind/react";

export const CommentsItem = ({ comment, postId }) => {
  const initialValues = {
    postsId: postId,
    parentCommentId: comment?._id,
    content: "",
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [isActionBtnsVisible, setIsActionBtnsVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const replyFormRef = useRef(null);
  const actionBtnsRef = useRef(null);

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(comment?._id));
    await dispatch(getAllComment());
  };

  const handleReplyClick = () => {
    setIsReplyFormVisible(true);
  };

  const handleOutsideClick = (e) => {
    if (replyFormRef.current && !replyFormRef.current.contains(e.target)) {
      setIsReplyFormVisible(false);
    }

    if (actionBtnsRef.current && !actionBtnsRef.current.contains(e.target)) {
      setIsActionBtnsVisible(false);
    }
  };

  const handleActionClick = () => {
    setIsActionBtnsVisible(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    initialValues.content = replyContent;
    await dispatch(createChildComment(initialValues));
    await dispatch(getAllComment());
    setReplyContent("");
    setIsReplyFormVisible(false);
  };

  return (
    <div>
      {!comment?.parentComment && (
        <div>
          <article className="p-2 mb-3 text-base bg-white rounded-lg dark:bg-gray-900 font-inter border-[1px] border-dark/10">
            <div className="p-2">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {!comment.user ? (
                    <img
                      className="mr-2 w-8 h-8 rounded-full"
                      src={staticImages.blank_user}
                      alt=""
                    />
                  ) : (
                    <img
                      className="mr-2 w-8 h-8 rounded-full"
                      src={
                        comment?.user?.avatar?.url
                          ? comment?.user?.avatar?.url
                          : comment?.user?.avatar
                      }
                      alt=""
                    />
                  )}
                  <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
                    {!comment?.user ? "Anonymous" : comment?.user?.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span>{formatDateToTimeAgo(comment?.createdAt)}</span>
                  </p>
                </div>
                {comment?.user?._id === user?._id && (
                  <div
                    className="inline-flex relative items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 default-transition"
                    onClick={handleActionClick}
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

                    {isActionBtnsVisible && (
                      <div
                        className=" z-10 w-[120px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-full"
                        ref={actionBtnsRef}
                      >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                          {/* <li>
                            <a
                              href="#"
                              className="block py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white default-transition"
                            >
                              Edit
                            </a>
                          </li> */}
                          <li>
                            <button
                              className="block w-full py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white default-transition"
                              onClick={() => handleDeleteComment(comment?._id)}
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
              <p className="text-dark/90 text-sm">{comment?.content}</p>
              <div className="flex items-center mt-2 space-x-4 mb-4">
                <button
                  type="button"
                  className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400"
                  onClick={handleReplyClick}
                >
                  <svg
                    className="mr-1.5 w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                  </svg>
                  Reply
                </button>
              </div>
            </div>

            {comment?.childComments?.length > 0 && (
              <div className="bg-whitesmoke/40 py-4 rounded-lg">
                <p className="px-3 mb-2 text-sm font-semibold">
                  Some Replies:{" "}
                </p>
                {comment?.childComments?.map((childComment) => {
                  return (
                    <ChildCommentsItem
                      childComment={childComment}
                      key={childComment?._id}
                    />
                  );
                })}
              </div>
            )}

            {isReplyFormVisible && (
              <div className="child-comment-form mt-4" ref={replyFormRef}>
                <form
                  className="flex flex-col items-end"
                  onSubmit={handleReplySubmit}
                >
                  <textarea
                    className="bg-white rounded-lg border border-gray-300 resize-none w-full h-16 p-2 placeholder:text-[13px] placeholder-gray-500 font-inter text-sm focus:outline-none focus:bg-white"
                    name="content"
                    placeholder="Type Your Comment"
                    value={replyContent}
                    onChange={handleReplyContentChange}
                  ></textarea>
                  <Button
                    type="submit"
                    className="mt-2 mb-2 py-2 rounded bg-moonstone font-inter"
                  >
                    Send Reply
                  </Button>
                </form>
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
};

CommentsItem.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string,
};

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createComment,
  getAllComment,
} from "../../../redux/slices/commentSlice";
import PropTypes from "prop-types";
import SpinLoader from "../SpinLoader";

export const CommentsForm = ({ postId }) => {
  const initialValues = {
    postsId: postId,
    content: "",
  };
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);
  const commentContentHandler = (e) => {
    setCommentContent(e.target.value);
  };

  const sendComment = async (e) => {
    e.preventDefault();
    if (commentContent.trim().length === 0) {
      toast.error("Please write your comment.");
      return;
    }
    const commentData = {
      ...initialValues,
      content: commentContent,
    };
    await dispatch(createComment(commentData));
    await dispatch(getAllComment());
    setCommentContent("");
  };

  return (
    <>
      <div className="flex justify-center mx-auto lg:px-2">
        <div className="w-full">
          <form
            onSubmit={sendComment}
            className="relative z-10 h-auto overflow-hidden"
          >
            <textarea
              type="text"
              name="content"
              onChange={commentContentHandler}
              value={commentContent}
              className="w-full px-4 py-3 mb-4 border-[1px] border-gray-300 rounded-lg focus:outline-none resize-none font-inter max-w-[700px]"
              placeholder="Write your comment"
              rows="3"
            ></textarea>
            {isLoading && <SpinLoader />}
            <button
              type="submit"
              className=" text-white px-4 py-2 bg-moonstone font-medium font-inter rounded cursor-pointer flex items-center"
            >
              Send Your Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

CommentsForm.propTypes = {
  postId: PropTypes.string,
};

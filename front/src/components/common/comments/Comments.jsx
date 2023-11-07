import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CommentsItem } from "./CommentsItem";

export const Comments = ({ comments, postId }) => {
  const [arrangedComments, setArrangedComments] = useState([]);

  const filterParentComments = (comments) => {
    let tempParentComments = [];
    comments.forEach((comment) => {
      if (
        !Object.prototype.hasOwnProperty.call(comment, "parentComment") ||
        comment.parentComment === null
      ) {
        tempParentComments.push(comment);
      }
    });
    return tempParentComments;
  };

  const filterChildComments = (comments) => {
    let tempChildComments = [];
    comments.forEach((comment) => {
      if (
        Object.prototype.hasOwnProperty.call(comment, "parentComment") &&
        comment.parentComment !== null
      ) {
        tempChildComments.push(comment);
      }
    });
    return tempChildComments;
  };

  const arrangeComments = (comments) => {
    let tempParentComments = filterParentComments(comments);
    let tempChildComments = filterChildComments(comments);

    if (tempChildComments.length > 0) {
      tempChildComments.forEach((childComment) => {
        const tempArr = tempParentComments.map((parentComment) => {
          if (childComment.parentComment._id === parentComment._id) {
            return {
              ...parentComment,
              childComments: [
                ...(parentComment.childComments || []),
                childComment,
              ],
            };
          } else {
            return parentComment;
          }
        });
        tempParentComments = tempArr;
      });
    }
    setArrangedComments(tempParentComments);
  };

  useEffect(() => {
    if (comments.length > 0) arrangeComments(comments);
  }, [comments]);

  return (
    <div className="pb-4 lg:px-2 mt-10">
      {arrangedComments.length > 0 && (
        <h2 className="text-dark text-lg font-semibold font-inter mb-3">
          Some recent comments
        </h2>
      )}

      <div className="grid">
        {arrangedComments.length > 0 ? (
          arrangedComments?.map((comment) => (
            <CommentsItem key={comment._id} comment={comment} postId={postId} />
          ))
        ) : (
          <p className="text-dark text-lg font-semibold font-inter mb-3">
            Be first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
};

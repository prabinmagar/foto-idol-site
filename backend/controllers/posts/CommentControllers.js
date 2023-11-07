const asyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const CommentModel = require("../../models/posts/CommentModel");

const createComment = asyncHandler(async (req, res) => {
  const { postsId, content, parentCommentId } = req.body;

  if (!postsId || !content) {
    res.status(400);
    throw new Error("Both 'postsId' and 'content' are required fields.");
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(content);

  if (isProfane) {
    return res.status(422).json({ message: "Creation failed because the content contains profane words, and your comment cannot be posted due to content guidelines." });
  }

  const commentData = await CommentModel.create({
    user: req.user._id,
    posts: postsId,
    content: content,
    parentComment: parentCommentId,
  });

  if (parentCommentId) {
    const parentComment = await CommentModel.findById(parentCommentId);
    if (!parentCommentId) {
      res.status(400);
      throw new Error("Parent comment not found");
    }
    commentData.parentComment = parentComment._id;
  }
  const commentCreate = await CommentModel.create(commentData);
  res.status(201).json({ message: "Comment posted successfully", comment: commentCreate });
});

const getAllComment = asyncHandler(async (req, res) => {
  const allComment = await CommentModel.find({})
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate({
      path: "posts",
      select: "title",
      populate: {
        path: "user",
        select: "name avatar"
      }
    })
    .populate({
      path: "parentComment",
      populate: {
        path: "user",
        select: "name avatar",
      },
    });

  if (!allComment) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  res.status(200).json({
    totalComments: allComment?.length,
    allComment,
  });
});

const getComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const commentsForPost = await CommentModel.find({ posts: postId })
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate({
      path: "parentComment",
      populate: {
        path: "user",
        select: "name avatar",
      },
    });

  if (!commentsForPost) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  res.status(200).json({
    totalComments: commentsForPost?.length,
    commentsForPost,
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const comment = await CommentModel.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("comment not found!");
  }

  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to delete this comment");
  }

  const data = await CommentModel.findByIdAndDelete(id);
  res.status(200).json({ data, message: "Comment Delete Successfully" });
});

// Only access for admin
const getAllCommentByAmdin = asyncHandler(async (req, res) => {
  const allComment = await CommentModel.find({})
    .populate({
      path: "user",
      select: "name avatar",
    })
    .populate("posts")
    .populate({
      path: "parentComment",
      populate: {
        path: "user",
        select: "name avatar",
      },
    });

  if (!allComment) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  res.status(200).json(allComment);
});

module.exports = { createComment, getAllComment, deleteComment, getAllCommentByAmdin, getComment };

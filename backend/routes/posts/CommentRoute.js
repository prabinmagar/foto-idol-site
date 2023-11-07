const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const { createComment, getAllComment, deleteComment, getAllCommentByAmdin, getComment } = require("../../controllers/posts/CommentControllers");
const router = express.Router();

router.post("/", protect, createComment);
router.get("/", getAllComment);
router.get("/single/:postId", getComment);
router.delete("/", protect, deleteComment);
router.get("/admin", protect, getAllCommentByAmdin);

module.exports = router;

const asyncHandler = require("express-async-handler");
const PostsModel = require("../../models/posts/PostsModel");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const AssetLimitConfigModel = require("../../models/posts/AssetLimitConfigModel");
const Filter = require("bad-words");
const UserModel = require("../../models/users/UserModel");
const { PostsLimit } = require("../../models/SettingModel");
const { isValidObjectId, default: mongoose } = require("mongoose");

const createPosts = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  // post limit
  const postsLimitConfig = await PostsLimit.findOne();
  if (!postsLimitConfig) {
    return res.status(500).json({ message: "Posts limit configuration not found" });
  }
  const userPostCount = await PostsModel.countDocuments({ user: userId });

  // Check if the user is an admin or has reached the post limit
  if (userRole !== "admin" && userPostCount >= postsLimitConfig.assetLimit) {
    return res.status(400).json({ error: `You have reached the maximum post limit (${postsLimitConfig.assetLimit} posts).` });
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title);
  const isProfanedescription = filter.isProfane(req.body.description);
  if (isProfane || isProfanedescription) {
    res.status(204);
    throw new Error("Creation failed because the content contains profane words, and your post cannot be posted due to content guidelines.");
  }

  if (!title || !description || !category) {
    res.status(404);
    throw new Error("All fields must be provided for this About to be created.");
  }

  // Check if a post with the same category already exists for non-admin users
  if (userRole !== "admin") {
    const existingPost = await PostsModel.findOne({ user: userId, category: category });
    if (existingPost) {
      return res.status(400).json({ error: `A post with the same category already exists.` });
    }
  }

  const originalSlug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });

  let slug = originalSlug;
  let suffix = 1;

  while (await PostsModel.findOne({ slug })) {
    slug = `${suffix}-${originalSlug}`;
    suffix++;
  }

  const assetLimitConfig = await AssetLimitConfigModel.findOne();
  if (!assetLimitConfig) {
    return res.status(500).json({ message: "Asset limit configuration not found" });
  }

  if (req.files && req.files.length > assetLimitConfig.assetLimit) {
    return res.status(400).json({ message: `You can only upload ${assetLimitConfig.assetLimit} images.` });
  }

  let fileData = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      try {
        if (file.size > 3 * 1024 * 1024) {
          return res.status(400).json({ error: "Images exceed the 3MB size limit." });
        }
        const uploadedFile = await cloudinary.uploader.upload(file.path, {
          folder: "Photo Idol/Posts",
          resource_type: "image",
        });

        fileData.push({
          fileName: file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: file.mimetype,
          publicId: uploadedFile.public_id,
        });
      } catch (error) {
        res.status(500);
        throw new Error(error);
      }
    }
  }

  const data = await PostsModel.create({
    user: userId,
    title,
    slug: slug,
    description,
    category,
    assets: fileData,
  });
  res.status(201).json({ message: "Posts created successfully", data });
});

const getallPostofUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostsModel.find({ user: userId })
      .populate("user")
      .populate({
        path: "user",
        select: "avatar name email bio",
      })
      .populate("likes")
      .populate("category");
    res.status(200).json({ total: posts.length, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching user's posts." });
  }
});

const getallPost = asyncHandler(async (req, res) => {
  const posts = await PostsModel.find({})
    .populate("user")
    .populate({
      path: "user",
      select: "avatar name email bio role",
    })
    .populate("likes")
    .populate("category")
    .sort("-createdAt");
  res.status(201).json({ total: posts.length, posts });
});

const getallPosts = asyncHandler(async (req, res) => {
  let filter = {};

  // Check if there's a category filter in the query parameters
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Check if there's a title search in the query parameters
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: "i" };
  }

  // Pagination configuration
  const perPage = 5; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Current page number

  const totalPosts = await PostsModel.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / perPage);

  const skip = (page - 1) * perPage;

  const posts = await PostsModel.find(filter).skip(skip).limit(perPage);

  res.status(200).json({
    totalPosts,
    totalPages,
    currentPage: page,
    posts,
  });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await PostsModel.findOne({ slug: req.params.slug }).populate("user").populate("category").populate("likes");
  if (!post) {
    res.status(404);
    throw new Error("Posts not found");
  }
  post.numOfViews += 1;
  await post.save();

  res.status(200).json(post);
});

const deletePosts = asyncHandler(async (req, res) => {
  let postId;

  if (req.body && req.body.id) {
    postId = req.body.id;
  } else if (req.params && req.params.id) {
    postId = req.params.id;
  }

  if (!postId) {
    res.status(400);
    throw new Error("Post not found. Please ensure you've provided the correct post ID information.");
  }
  const post = await PostsModel.findOne({ _id: postId });
  if (!post) {
    res.status(404);
    throw new Error("Post not found. Please ensure you've provided the correct post information.");
  }

  if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You are not authorized to delete this post.");
  }

  // Delete the cover from Cloudinary
  if (post.cover && post.cover.publicId) {
    try {
      const result = await cloudinary.uploader.destroy(post.cover.publicId);
      if (result.result !== "ok") {
        res.status(500).json({ message: "Error deleting cover from Cloudinary" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the cover image from Cloudinary." });
      return;
    }
  }

  // Delete the cover file from the local device
  /*  if (About.cover && About.cover.fileName) {
    const fileName = About.cover.fileName;
    console.log(fileName);
    const localFilePath = `uploads/${fileName}`;

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    } else {
      return res.status(404).json({ message: "The cover image file does not exist on the local device." });
    }
  }
 */

  await post.deleteOne();
  res.status(200).json({ message: "The post has been successfully deleted." });
});

const updatePosts = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { title, category, description, updatedAssets } = req.body;

  try {
    const post = await PostsModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user is the user of the post and admin
    if (post.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update this post." });
    }

    // Check if the new category already exists for non-admin users
    if (req.user.role !== "admin") {
      const existingPost = await PostsModel.findOne({ user: req.user._id, category: category });
      if (existingPost && existingPost._id.toString() !== postId) {
        return res.status(400).json({ message: "A post with the same category already exists." });
      }
    }

    // Update post fields
    post.title = title || post.title;
    post.category = category || post.category;
    post.description = description || post.description;
    const originalSlug = slugify(post.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      strict: true,
    });

    let slug = originalSlug;
    let suffix = 1;

    while (await PostsModel.findOne({ slug })) {
      slug = `${suffix}-${originalSlug}`;
      suffix++;
    }

    post.slug = slug;
    post.assets = [];

    // Handle image updates
    if (updatedAssets && updatedAssets.length > 0) {
      const assetLimitConfig = await AssetLimitConfigModel.findOne();

      if (!assetLimitConfig) {
        return res.status(500).json({ message: "Asset limit configuration not found." });
      }

      // Check if the number of updated assets exceeds the asset limit
      if (updatedAssets.length > assetLimitConfig.assetLimit) {
        return res.status(400).json({ message: `You can only update ${assetLimitConfig.assetLimit} assets.` });
      }

      // Delete the previous images from Cloudinary for the specified updatedAssets
      for (const updatedAssetIndex of updatedAssets) {
        if (post.assets[updatedAssetIndex]) {
          await cloudinary.uploader.destroy(post.assets[updatedAssetIndex].publicId);
          // Remove the asset from the post's assets array
          post.assets.splice(updatedAssetIndex, 1);
        }
      }

      // Upload new images to Cloudinary
      const fileData = [];

      for (const file of req.files) {
        try {
          const uploadedFile = await cloudinary.uploader.upload(file.path, {
            folder: "Photo Idol/Posts",
            resource_type: "image",
          });

          fileData.push({
            fileName: file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: file.mimetype,
            publicId: uploadedFile.public_id,
          });
        } catch (error) {
          return res.status(500).json({ message: "One or more images could not be uploaded." });
        }
      }

      // Add the new assets to the post's assets array
      for (const updatedAssetIndex of updatedAssets) {
        post.assets.splice(updatedAssetIndex, 0, fileData.shift());
      }
    }

    // Save the updated post
    // await post.save();
    const updatedPost = await PostsModel.findByIdAndUpdate(postId, post, { new: true });
    // res.status(200).json({ message: "Post updated successfully", data: post });
    res.status(200).json({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the post." });
  }
});

const userPostsSearch = asyncHandler(async (req, res) => {
  try {
    const { userId, email } = req.query;

    const query = userId ? { user: userId } : {};
    if (email) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      query.user = user._id;
    }
    const postCount = await PostsModel.find(query);
    res.status(200).json({ totalPost: postCount.length, postCount });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post count", error: error.message });
  }
});

const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: "Resource ID is invalid!" });
  }

  try {
    const resource = await PostsModel.findById(id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found!" });
    }

    if (resource.likes.includes(userId)) {
      await PostsModel.updateOne({ _id: id }, { $pull: { likes: userId } });
      return res.json({ status: "removed" });
    } else {
      await PostsModel.updateOne({ _id: id }, { $addToSet: { likes: userId } });
      return res.json({ status: "added" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = { createPosts, getallPostofUser, getallPosts, getallPost, getPost, deletePosts, updatePosts, userPostsSearch, toggleLike };

const asyncHandler = require("express-async-handler");
const CategoryModel = require("../../models/posts/CategoryModel");
const PostsModel = require("../../models/posts/PostsModel");
const cloudinary = require("cloudinary").v2;

const createCategory = asyncHandler(async (req, res) => {
  const { title, subcategory } = req.body;

  const isTitleExits = await CategoryModel.findOne({ title });
  if (isTitleExits) {
    res.status(400);
    throw new Error("Category with the same title already exists.");
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/Category",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  const categoryData = await CategoryModel.create({
    user: req.user._id,
    title: title,
    subcategory: subcategory,
    cover: fileData,
  });
  res.status(201).json({
    message: "Category created successfully.",
    category: categoryData,
  });
});

const getAllCategory = asyncHandler(async (req, res) => {
  const categorys = await CategoryModel.find().sort("-createdAt").populate({
    path: "user",
    select: "avatar name email",
  });

  if (!categorys) {
    res.status(500);
    throw new Error("An unexpected error occurred. Please try again later or contact our support team for assistance.");
  }

  res.status(200).json({ total: categorys?.length, categorys });
});

const getCategory = asyncHandler(async (req, res) => {
  let categoryId;

  if (req.body && req.body.id) {
    categoryId = req.body.id;
  } else if (req.params && req.params.id) {
    categoryId = req.params.id;
  }

  if (!categoryId) {
    res.status(400);
    throw new Error("Category ID is required in the request.");
  }

  const category = await CategoryModel.findOne({ _id: categoryId });

  if (!category) {
    res.status(404);
    throw new Error("Category not found. Please check the provided information.");
  }
  // Find all posts with the same category ID
  const posts = await PostsModel.find({ category: categoryId });

  const categoryWithPosts = {
    ...category.toObject(),
    posts,
  };

  res.status(200).json(categoryWithPosts);
});

const deleteCategory = asyncHandler(async (req, res) => {
  let categoryId;

  if (req.body && req.body.id) {
    categoryId = req.body.id;
  } else if (req.params && req.params.id) {
    categoryId = req.params.id;
  }

  if (!categoryId) {
    res.status(400);
    throw new Error("Category ID is required in the request.");
  }
  const category = await CategoryModel.findOne({ _id: categoryId });

  if (!category) {
    res.status(404);
    throw new Error("Category not found. Please check the provided information.");
  }

  if (category.cover && category.cover.publicId) {
    try {
      const result = await cloudinary.uploader.destroy(category.cover.publicId);
      if (result.result !== "ok") {
        res.status(500).json({ message: "Error deleting cover from Cloudinary" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the cover image from Cloudinary." });
      return;
    }
  }

  await category.deleteOne();
  res.status(200).json({ message: "Category deleted successfully" });
});

const updateCategorys = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) {
    res.status(400).json({ message: "Title must be provided for the update." });
    return;
  }

  let fileData = {};

  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/Category",
        resource_type: "image",
      });
    } catch (error) {
      return res.status(500).json({ message: "Image could not be uploaded." });
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  try {
    const categoryToUpdate = await CategoryModel.findById(id);

    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Category not found." });
    }

    if (categoryToUpdate.cover && categoryToUpdate.cover.publicId) {
      try {
        await cloudinary.uploader.destroy(categoryToUpdate.cover.publicId);
      } catch (error) {
        return res.status(500).json({ message: "Error deleting previous cover from Cloudinary." });
      }
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      {
        user: userId,
        title,
        ...(fileData && { cover: fileData }),
      },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the Category." });
  }
});

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, subcategory } = req.body;

  try {
    // Find the category by its ID
    const categoryToUpdate = await CategoryModel.findById(id);

    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Update the title if it's provided in the request
    if (title) {
      categoryToUpdate.title = title;
    }
    if (subcategory) {
      categoryToUpdate.subcategory = subcategory;
    }

    // Check if a new cover image is provided
    if (req.file) {
      try {
        const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Photo Idol/Category",
          resource_type: "image",
        });

        // If a new image is provided, delete the previous cover image if it exists
        if (categoryToUpdate.cover && categoryToUpdate.cover.publicId) {
          try {
            await cloudinary.uploader.destroy(categoryToUpdate.cover.publicId);
          } catch (error) {
            return res.status(500).json({ message: "Error deleting previous cover from Cloudinary." });
          }
        }

        categoryToUpdate.cover = {
          fileName: req.file.originalname,
          filePath: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          publicId: uploadedFile.public_id,
        };
      } catch (error) {
        return res.status(500).json({ message: "Image could not be uploaded." });
      }
    }

    // Save the updated category
    const updatedCategory = await categoryToUpdate.save();

    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the Category." });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

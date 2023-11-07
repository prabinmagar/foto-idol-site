const asyncHandler = require("express-async-handler");
const { AboutImage, AboutLocation } = require("../models/AboutModel");
const cloudinary = require("cloudinary").v2;

/* ----------------- About Images ------------------- */
const createAbout = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let fileData = {};

  const totalImageCount = await AboutImage.countDocuments();
  if (totalImageCount >= 3) {
    return res.status(400).json({ message: "The maximum limit of 3 images has been reached." });
  }

  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/About",
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

  const data = await AboutImage.create({ user: userId, cover: fileData });
  res.status(201).json({ message: "About created successfully", data });
});

const getAllAbout = asyncHandler(async (req, res) => {
  const about = await AboutImage.find().sort("createdAt");
  res.status(200).json({
    total: about?.length,
    about,
  });
});

const deleteAbout = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const about = await AboutImage.findById(id);
  if (!about) {
    res.status(404);
    throw new Error("About not found. Please ensure you've provided the correct About information.");
  }

  if (about.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You are not authorized to delete this About.");
  }

  // Delete the cover from Cloudinary
  if (about.cover && about.cover.publicId) {
    try {
      const result = await cloudinary.uploader.destroy(about.cover.publicId);
      if (result.result !== "ok") {
        res.status(500).json({ message: "Error deleting cover from Cloudinary" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the cover image from Cloudinary." });
      return;
    }
  }

  await about.deleteOne();
  res.status(200).json({ message: "The About has been successfully deleted." });
});

const updateAbout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/About",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500).json({ message: "Image could not be uploaded." });
      return;
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  try {
    const AboutToUpdate = await AboutImage.findById(id);

    if (!AboutToUpdate) {
      res.status(404).json({ message: "About not found." });
      return;
    }

    // Delete the previous image from Cloudinary if it exists
    if (AboutToUpdate.cover && AboutToUpdate.cover.publicId) {
      try {
        await cloudinary.uploader.destroy(AboutToUpdate.cover.publicId);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting previous cover from Cloudinary." });
        return;
      }
    }

    const updatedAbout = await AboutImage.findByIdAndUpdate(
      id,
      {
        user: userId,
        ...(fileData && { cover: fileData }),
      },
      { new: true }
    );

    if (!updatedAbout) {
      res.status(404).json({ message: "About not found." });
      return;
    }

    res.status(200).json({ message: "About updated successfully", data: updatedAbout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the About." });
  }
});
/* ----------------- About Images ------------------- */

/* ----------------- About Location ------------------- */
const createAboutLocation = async (req, res) => {
  try {
    const { name, address, phone, email } = req.body;
    const user = req.user.id;

    const aboutLocation = new AboutLocation({ user, name, address, phone, email });

    const savedAboutLocation = await aboutLocation.save();

    res.status(201).json({ message: "About Location created successfully", data: savedAboutLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAboutLocations = async (req, res) => {
  try {
    const aboutLocations = await AboutLocation.find();

    res.status(200).json({ total: aboutLocations?.length, data: aboutLocations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAboutLocation = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const aboutLocation = await AboutLocation.findById(id);
    if (!aboutLocation) {
      return res.status(404).json({ message: "About Location not found" });
    }
    if (!updates.name) {
      updates.name = aboutLocation.name;
    }
    if (!updates.address) {
      updates.address = aboutLocation.address;
    }
    if (!updates.phone) {
      updates.phone = aboutLocation.phone;
    }
    if (!updates.email) {
      updates.email = aboutLocation.email;
    }
    const updatedAboutLocation = await AboutLocation.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: "About Location updated successfully", data: updatedAboutLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAboutLocation = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const about = await AboutLocation.findById(id);
  if (!about) {
    res.status(404);
    throw new Error("About location not found. Please ensure you've provided the correct About location information.");
  }

  if (about.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You are not authorized to delete this About.");
  }

  await about.deleteOne();
  res.status(200).json({ message: "The About location has been successfully deleted." });
});
/* ----------------- About Location ------------------- */

module.exports = {
  createAbout,
  getAllAbout,
  deleteAbout,
  updateAbout,
  createAboutLocation,
  getAllAboutLocations,
  updateAboutLocation,
  deleteAboutLocation,
};

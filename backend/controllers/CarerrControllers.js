const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const slugify = require("slugify");
const fs = require("fs");
const CarerrModel = require("../models/CarerrModel");
const path = require("path");

const createCareer = asyncHandler(async (req, res) => {
  const { title, salary, description } = req.body;
  const userId = req.user.id;

  if (!title || !description || !salary) {
    res.status(404);
    throw new Error("All fields must be provided for this Career to be created.");
  }
  const originalSlug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  });

  let slug = originalSlug;
  let suffix = 1;

  while (await CarerrModel.findOne({ slug })) {
    slug = `${suffix}-${originalSlug}`;
    suffix++;
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/Careers",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    /*  const timestamp = new Date().toISOString().replace(/:/g, "-");
    const fileName = `${timestamp}-${req.file.originalname}`; */

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  const data = await CarerrModel.create({ user: userId, title, slug: slug, description, salary, cover: fileData });
  res.status(201).json({ message: "Career created successfully", data });
});

const getAllCareers = asyncHandler(async (req, res) => {
  const career = await CarerrModel.find().sort("-createdAt");
  res.status(200).json({
    total: career?.length,
    career,
  });
});

const getCareer = asyncHandler(async (req, res) => {
  const careers = await CarerrModel.findOne({ slug: req.params.slug });
  if (!careers) {
    res.status(404);
    throw new Error("Career not found");
  }
  res.status(200).json(careers);
});

const deleteCareer = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const career = await CarerrModel.findById(id);
  if (!career) {
    res.status(404);
    throw new Error("Career not found. Please ensure you've provided the correct career information.");
  }

  if (career.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You are not authorized to delete this career.");
  }

  // Delete the cover from Cloudinary
  if (career.cover && career.cover.publicId) {
    try {
      const result = await cloudinary.uploader.destroy(career.cover.publicId);
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
  /*  if (career.cover && career.cover.fileName) {
    const fileName = career.cover.fileName;
    console.log(fileName);
    const localFilePath = `uploads/${fileName}`;

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    } else {
      return res.status(404).json({ message: "The cover image file does not exist on the local device." });
    }
  }
 */
  await career.deleteOne();
  res.status(200).json({ message: "The career has been successfully deleted." });
});

const updateCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, salary, description } = req.body;
  const userId = req.user.id;

  if (!title || !description || !salary) {
    res.status(400).json({ message: "All fields must be provided for the update." });
    return;
  }

  let fileData = {};

  if (req.file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Photo Idol/Careers",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500).json({ message: "Image could not be uploaded." });
      return;
    }

    /*  const timestamp = new Date().toISOString().replace(/:/g, "-");
    const fileName = `${timestamp}-${req.file.originalname}`; */

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      publicId: uploadedFile.public_id,
    };
  }

  try {
    const careerToUpdate = await CarerrModel.findById(id);

    if (!careerToUpdate) {
      res.status(404).json({ message: "Career not found." });
      return;
    }

    // Delete the previous image from Cloudinary if it exists
    if (careerToUpdate.cover && careerToUpdate.cover.publicId) {
      try {
        await cloudinary.uploader.destroy(careerToUpdate.cover.publicId);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting previous cover from Cloudinary." });
        return;
      }
    }

    const updatedCareer = await CarerrModel.findByIdAndUpdate(
      id,
      {
        user: userId,
        title,
        description,
        salary,
        ...(fileData && { cover: fileData }),
      },
      { new: true }
    );

    if (!updatedCareer) {
      res.status(404).json({ message: "Career not found." });
      return;
    }

    res.status(200).json({ message: "Career updated successfully", data: updatedCareer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the career." });
  }
});

const test = asyncHandler(async (req, res) => {
  const careerId = req.params.careerId;

  try {
    const career = await CarerrModel.findById(careerId);
    if (!career) {
      return res.status(404).json({ message: "Career not found." });
    }

    const fileName = career.cover.fileName;
    console.log("File Name:", fileName);

    // Construct the absolute localFilePath
    const localFilePath = path.join(__dirname, `../uploads/${fileName}`);
    console.log("Local File Path:", localFilePath);

    try {
      await fs.promises.access(localFilePath, fs.constants.F_OK);
      res.status(200).json({ message: "The cover image file exists on the local device." });
    } catch (error) {
      console.error("File Access Error:", error);
      res.status(404).json({ message: "The cover image file does not exist on the local device." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the career information." });
  }
});
module.exports = {
  createCareer,
  getAllCareers,
  deleteCareer,
  getCareer,
  updateCareer,
  test,
};

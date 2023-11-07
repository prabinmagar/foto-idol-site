const express = require("express");
const { upload } = require("../utils/uploadImg");
const { protect, admin } = require("../middleware/authMiddleware");
const { createAbout, getAllAbout, deleteAbout, updateAbout, createAboutLocation, getAllAboutLocations, updateAboutLocation, deleteAboutLocation } = require("../controllers/AboutControllers");
const router = express.Router();

router.post("/", protect, admin, upload.single("cover"), createAbout);
router.get("/", getAllAbout);
router.delete("/", protect, admin, deleteAbout);
router.put("/:id", protect, admin, upload.single("cover"), updateAbout);

router.post("/location", protect, admin, createAboutLocation);
router.get("/location", getAllAboutLocations);
router.patch("/location/:id", protect, admin, updateAboutLocation);
router.delete("/location", protect, admin, deleteAboutLocation);

module.exports = router;

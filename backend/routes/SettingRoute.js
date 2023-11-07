const express = require("express");
const { admin, protect } = require("../middleware/authMiddleware");
const validation = require("../middleware/Validation");
const { upload } = require("../utils/uploadImg");
const { createHomeSliderValidation } = require("../utils/validations");
const { createHomeSlider, getAllhomeSlider, deletehomeSlider, updatehomeSlider, toggleHomeFeature, getFeaturesLists, createOrUpdateContactInfo, getContactInfo, gethomeSlider, toggleCategoryFeature, getCategoryLists, createOrUpdatePostsLimit, getPostsLimit } = require("../controllers/SettingCtr");
const router = express.Router();

router.post("/homeslider", protect, admin, upload.single("cover"), validation(createHomeSliderValidation), createHomeSlider);
router.get("/homeslider", getAllhomeSlider);
router.get("/homeslider/:id", protect, admin, gethomeSlider);
router.delete("/homeslider", protect, admin, deletehomeSlider);
router.put("/homeslider/:id", upload.single("cover"), protect, admin, updatehomeSlider);

// Posts freatures list
router.post("/feature", protect, admin, toggleHomeFeature);
router.get("/feature", getFeaturesLists);

// Catgeory freatures list
router.post("/category", protect, admin, toggleCategoryFeature);
router.get("/category", getCategoryLists);

//Contact Information
router.post("/contactinfo", protect, admin, createOrUpdateContactInfo);
router.get("/contactinfo", getContactInfo);

//Posts config
router.post("/postconfig", protect, admin, createOrUpdatePostsLimit);
router.get("/postconfig", getPostsLimit);

module.exports = router;

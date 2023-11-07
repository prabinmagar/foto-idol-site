const express = require("express");
const {
  createCareer,
  getAllCareers,
  getCareer,
  deleteCareer,
  test,
  updateCareer,
} = require("../controllers/CarerrControllers");
const { upload } = require("../utils/uploadImg");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllCareers);
router.get("/:slug", getCareer);

router.post("/", protect, admin, upload.single("cover"), createCareer);
router.delete("/", protect, admin, deleteCareer);
router.put("/:id", protect, admin, upload.single("cover"), updateCareer);

router.get("/test-file-exists/:careerId", test);

module.exports = router;

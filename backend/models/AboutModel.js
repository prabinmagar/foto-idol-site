const mongoose = require("mongoose");

const aboutImageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cover: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
const aboutLocationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AboutImage = mongoose.model("AboutImage", aboutImageSchema);
const AboutLocation = mongoose.model("AboutLocation", aboutLocationSchema);
module.exports = { AboutImage, AboutLocation };

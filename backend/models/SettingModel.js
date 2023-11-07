const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Home Slider", "Creatives", "Model"],
    },
  },
  { timestamps: true }
);

const homeFeatureSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts",
      },
    ],
  },
  { timestamps: true }
);

const categoryFeatureSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

const contactInfoSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    socialMedia: [
      {
        link: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const postsLimitConfigSchema = new mongoose.Schema({
  assetLimit: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const HomeSlider = mongoose.model("HomeSlider", homeSchema);
const HomeFeature = mongoose.model("HomeFeature", homeFeatureSchema);
const CategoryFeature = mongoose.model("CategoryFeature", categoryFeatureSchema);
const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
const PostsLimit = mongoose.model("PostsLimitConfig", postsLimitConfigSchema);

module.exports = { HomeSlider, HomeFeature, CategoryFeature, ContactInfo, PostsLimit };

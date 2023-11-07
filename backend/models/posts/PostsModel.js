const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, require: true },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: { type: String, require: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numOfViews: {
      type: Number,
      default: 0,
    },
    assets: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Posts", postsSchema);

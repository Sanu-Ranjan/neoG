import mongoose from "mongoose";

const facebookPostSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
    },

    mentions: [
      {
        type: String,
      },
    ],

    hashtags: [
      {
        type: String,
      },
    ],

    imageUrl: {
      type: String,
    },

    likes: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    sharesCount: {
      type: Number,
      default: 0,
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const FacebookPost = mongoose.model("FacebookPost", facebookPostSchema);

export default FacebookPost;

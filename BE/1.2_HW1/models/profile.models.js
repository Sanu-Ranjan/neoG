const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicUrl: {
      type: String,
    },
    followingCount: {
      type: Number,
    },
    followerCount: {
      type: Number,
    },
    companyName: {
      type: String,
    },
    location: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
  },
  { timeStamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = {
  Profile,
};

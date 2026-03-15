const { connectDb } = require("./db/db.connect");
const { Profile } = require("./models/profile.models");

const fs = require("fs");
const jsonData = fs.readFileSync("profile.json", "utf-8");
const profileData = JSON.parse(jsonData);

const seedData = async () => {
  try {
    await connectDb();

    profileData.forEach((element) => {
      const {
        fullName,
        username,
        bio,
        profilePicUrl,
        followingCount,
        followerCount,
        companyName,
        location,
        portfolioUrl,
      } = element;

      const profile = new Profile({
        fullName,
        username,
        bio,
        profilePicUrl,
        followerCount,
        followingCount,
        companyName,
        location,
        portfolioUrl,
      });
      profile.save();
    });
  } catch (error) {}
};
seedData();

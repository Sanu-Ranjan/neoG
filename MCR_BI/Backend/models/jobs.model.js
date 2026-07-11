const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  jobTitle: { type: String, required: [true, "Job title is required"] },
  companyName: { type: String, required: [true, "Company name is required"] },
  location: { type: String, required: [true, "Job Location is required"] },
  salary: { type: Number, required: [true, "Expected salary is required"] },
  jobType: {
    type: String,
    required: [true, "Job Type is required"],
    enum: {
      values: [
        "Full-time (On-site)",
        "Part-time (On-site)",
        "Full-time (Remote)",
        "Part-time (Remote)",
      ],
      message: "{VALUE} is not a valid Job Type",
    },
  },
  jobDes: { type: String, required: [true, "Job Description is required"] },
  reqQuali: [{ type: String, required: [true, "Qualification is required"] }],
});

const Jobs = mongoose.model("jobs", jobsSchema);

module.exports = { Jobs };

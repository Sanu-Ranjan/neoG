const router = require("express").Router();

const {
  getAllJobs,
  getJobDetail,
  postJob,
  deleteJob,
  searchJob,
} = require("../controllers/postings.controller.js");

router.get("/", getAllJobs);
router.get("/search", searchJob); //here order matters first / then /search then /:jobId
router.get("/:jobId", getJobDetail);
router.post("/", postJob);
router.delete("/:jobId", deleteJob);

module.exports = { router };

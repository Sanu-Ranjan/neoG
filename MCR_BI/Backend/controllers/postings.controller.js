const { Jobs } = require("../models/jobs.model");
const { err, failure, ok, success } = require("../utils/response");

function jobDetails(body) {
  const { jobTitle, companyName, location, salary, jobType, jobDes, reqQuali } =
    body;
  return {
    jobTitle,
    companyName,
    location,
    salary,
    jobType,
    jobDes,
    reqQuali,
  };
}

const allJobs = async () => {
  try {
    const data = await Jobs.find().select({
      jobTitle: 1,
      companyName: 1,
      location: 1,
      jobType: 1,
    });
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const jobById = async (id) => {
  try {
    const data = await Jobs.findById(id);
    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const createJob = async (jobDetails) => {
  try {
    const saved = await Jobs.create(jobDetails);
    return ok(saved);
  } catch (error) {
    return err(error);
  }
};

const removeJob = async (id) => {
  try {
    const deleted = await Jobs.findByIdAndDelete(id);
    return ok(deleted);
  } catch (error) {
    return err(error);
  }
};

const jobByTitle = async (title) => {
  try {
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //makes it regex safe for mongodb
    const data = await Jobs.find({
      jobTitle: { $regex: escapeRegex(title), $options: "i" }, // i to make it case insensitive
    });

    return ok(data);
  } catch (error) {
    return err(error);
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { data, error } = await allJobs();
    if (error) {
      console.log("Error fetching jobs", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ jobs: data }, "Jobs postings fetched"));
  } catch (error) {
    console.log("Error at controller: getAllJobs", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const getJobDetail = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { data, error } = await jobById(jobId);
    if (error) {
      console.log("Error fetching job by Id", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ jobDetails: data }, "Jobs details fetched"));
  } catch (error) {
    console.log("Error at controller: getJobDetail", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const postJob = async (req, res) => {
  try {
    const job = jobDetails(req.body);
    const { data, error } = await createJob(job);
    if (error) {
      console.log("Error posting job openings", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(201).json(success({ added: data }, "New job opening added"));
  } catch (error) {
    console.log("Error at controller: postJob", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { data, error } = await removeJob(jobId);
    if (!data) return res.status(404).json(failure("Job not found"));
    if (error) {
      console.log("Error deleting job posting", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ deleted: data }, "Job posting deleted"));
  } catch (error) {
    console.log("Error at controller: deleteJob", error);
    res.status(500).json(failure("Internal server error"));
  }
};

const searchJob = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title)
      return res
        .status(400)
        .json(failure("Search query for title is required"));

    const { data, error } = await jobByTitle(title);
    if (error) {
      console.log("Error finding job by title", error);
      return res
        .status(500)
        .json(failure("Internal server error : database operation failed"));
    }
    res.status(200).json(success({ jobs: data }, "Jobs by title fetched"));
  } catch (error) {
    console.log("Error at controller: searchJob", error);
    res.status(500).json(failure("Internal server error"));
  }
};

module.exports = {
  getAllJobs,
  getJobDetail,
  postJob,
  deleteJob,
  searchJob,
};

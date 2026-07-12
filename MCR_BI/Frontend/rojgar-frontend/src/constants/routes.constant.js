const API_BASE_URL = import.meta.env.VITE_BACKEND;

export const DEFINE_APP_ROUTES = {
  HOME: "/jobs",
  JOB_DETAILS: `/jobs/:jobId`,
  ADD_JOB: "/jobs/add",
};

export const APP_ROUTES = {
  HOME: "/jobs",
  JOB_DETAILS: (jobId) => `/jobs/${jobId}`,
  ADD_JOB: "/jobs/add",
};

export const API_ROUTES = {
  base: `${API_BASE_URL}`,
  job: {
    getPostings: `${API_BASE_URL}/postings`,
    getDetail: (jobId) => `${API_BASE_URL}/postings/${jobId}`,
    getJobsByTitle: (title) => `${API_BASE_URL}/postings/search?title=${title}`,
    postJob: `${API_BASE_URL}/postings`,
    deleteJob: (jobId) => `${API_BASE_URL}/postings/${jobId}`,
  },
};

export const JOB_TYPES = [
  "Full-time (On-site)",
  "Part-time (On-site)",
  "Full-time (Remote)",
  "Part-time (Remote)",
];

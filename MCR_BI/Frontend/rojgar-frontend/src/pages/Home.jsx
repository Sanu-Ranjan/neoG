import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { JobCards } from "../components/JobCards";
import { useFetch } from "../hooks/useFetch";
import { deleteData } from "../utils/deleteData";
import { API_ROUTES } from "../constants/routes.constant";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 400);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const url = debouncedTerm
    ? API_ROUTES.job.getJobsByTitle(encodeURIComponent(debouncedTerm))
    : API_ROUTES.job.getPostings;

  const { data, error, loading } = useFetch(url);

  useEffect(() => {
    if (data?.success) {
      setJobs(data.data.jobs);
    }
  }, [data]);

  const handleDelete = async (jobId) => {
    const previousJobs = jobs;
    setJobs((current) => current.filter((job) => job._id !== jobId));

    const { data, error } = await deleteData(API_ROUTES.job.deleteJob(jobId));

    if (error || !data?.success) {
      setJobs(previousJobs);
      toast.error(data?.message ?? "Failed to delete job");
      return;
    }

    toast.success("Job posting deleted");
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search by job title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <h1 className="mb-4">All Jobs</h1>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          Something went wrong while fetching jobs.
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="alert alert-info">No jobs found.</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {jobs.map((job) => (
          <div className="col" key={job._id}>
            <JobCards detail={job} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </>
  );
};

export { Home };

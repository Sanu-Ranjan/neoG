import { useParams, Link } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { API_ROUTES, APP_ROUTES } from "../constants/routes.constant";

const Details = () => {
  const { jobId } = useParams();
  const { data, error, loading } = useFetch(API_ROUTES.job.getDetail(jobId));

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <>
        <div className="alert alert-danger">
          {data?.message ?? "Could not load job details."}
        </div>
        <Link className="btn btn-primary" to={APP_ROUTES.HOME}>
          Back to Job Postings
        </Link>
      </>
    );
  }

  const { jobTitle, companyName, location, salary, jobType, jobDes, reqQuali } =
    data.data.jobDetails;

  return (
    <>
      <h1 className="mb-4">{jobTitle}</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <p className="mb-2">
            <strong>Company Name:</strong> {companyName}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {location}
          </p>
          <p className="mb-2">
            <strong>Salary:</strong> {salary}
          </p>
          <p className="mb-2">
            <strong>Job Type:</strong> {jobType}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {jobDes}
          </p>

          <p className="mb-2">
            <strong>Qualifications:</strong>
          </p>
          <ol className="mb-0">
            {reqQuali.map((qualification) => (
              <li key={qualification}>{qualification}</li>
            ))}
          </ol>
        </div>
      </div>

      <Link className="btn btn-primary mt-4" to={APP_ROUTES.HOME}>
        Back to Job Postings
      </Link>
    </>
  );
};

export { Details };

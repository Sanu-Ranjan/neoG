import { Link } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes.constant";

const JobCards = ({ detail, onDelete }) => {
  const { _id, jobTitle, companyName, location, jobType } = detail;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{jobTitle}</h5>

        <p className="card-text mb-2">
          <strong>Company name:</strong> {companyName}
        </p>
        <p className="card-text mb-2">
          <strong>Location:</strong> {location}
        </p>
        <p className="card-text mb-3">
          <strong>Job Type:</strong> {jobType}
        </p>

        <div className="mt-auto d-flex flex-column flex-sm-row gap-2">
          <Link className="btn btn-primary" to={APP_ROUTES.JOB_DETAILS(_id)}>
            See Details
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export { JobCards };

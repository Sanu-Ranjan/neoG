import { Link, NavLink } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes.constant";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold" to={APP_ROUTES.HOME}>
          Intern House
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={APP_ROUTES.HOME} end>
                Job Postings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={APP_ROUTES.ADD_JOB}>
                Post a Job
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export { Navbar };

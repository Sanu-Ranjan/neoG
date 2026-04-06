import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const Header = ({ setSearch }) => {
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      navigate("/");
      setSearch(e.target.value);
    }, 300);
  };

  return (
    <header>
      <div className="container-md">
        <div className="row row-cols-1 row-cols-sm-2 mt-3 pt-2 g-3">
          <div className="col ">
            <div className="d-flex justify-content-sm-start justify-content-center">
              <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                <span
                  style={{
                    fontFamily: "Georgia",
                    fontStyle: "italic",
                    fontWeight: "700",
                    fontSize: "2rem",
                    color: "#e8175d",
                    letterSpacing: "-1px",
                  }}
                >
                  meetup
                </span>
              </p>
            </div>
          </div>
          <div className="col pt-2">
            <div className="d-flex justify-content-sm-end justify-content-center row">
              <div className="col-9 col-sm-10 col-md-8 col-lg-6 col-xl-5 w-45 ">
                <input
                  className="form-control text-sm-start text-center"
                  type="search"
                  name="search"
                  id="searchEvents"
                  placeholder="Search By title and tags"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </header>
  );
};

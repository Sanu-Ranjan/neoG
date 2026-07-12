import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postData } from "../utils/postData";
import {
  API_ROUTES,
  APP_ROUTES,
  JOB_TYPES,
} from "../constants/routes.constant";

const INITIAL_FORM = {
  jobTitle: "",
  companyName: "",
  location: "",
  salary: "",
  jobType: "",
  jobDes: "",
  reqQuali: "",
};

const AddJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.salary.trim()) {
      newErrors.salary = "Salary is required";
    } else if (Number.isNaN(Number(form.salary)) || Number(form.salary) <= 0) {
      newErrors.salary = "Salary must be a positive number";
    }

    if (!form.jobType) newErrors.jobType = "Job type is required";
    if (!form.jobDes.trim()) newErrors.jobDes = "Job description is required";
    if (!form.reqQuali.trim())
      newErrors.reqQuali = "At least one qualification is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);

    const payload = {
      jobTitle: form.jobTitle.trim(),
      companyName: form.companyName.trim(),
      location: form.location.trim(),
      salary: Number(form.salary),
      jobType: form.jobType,
      jobDes: form.jobDes.trim(),
      reqQuali: form.reqQuali
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    const { data, error } = await postData(API_ROUTES.job.postJob, payload);
    setSubmitting(false);

    if (error || !data?.success) {
      toast.error(data?.message ?? "Failed to post job");
      return;
    }

    toast.success("New job opening added");
    setForm(INITIAL_FORM);
    navigate(APP_ROUTES.HOME);
  };

  return (
    <>
      <h1 className="mb-4">Post a Job</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="jobTitle">
            Job Title:
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
            placeholder="e.g. Frontend Developer"
            value={form.jobTitle}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.jobTitle}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="companyName">
            Company Name:
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
            placeholder="e.g. Acme Corp"
            value={form.companyName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.companyName}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="location">
            Location:
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            placeholder="e.g. Bangalore, India"
            value={form.location}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.location}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="salary">
            Salary:
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            min="1"
            className={`form-control ${errors.salary ? "is-invalid" : ""}`}
            placeholder="e.g. 600000"
            value={form.salary}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.salary}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="jobType">
            Job Type:
          </label>
          <select
            id="jobType"
            name="jobType"
            className={`form-select ${errors.jobType ? "is-invalid" : ""}`}
            value={form.jobType}
            onChange={handleChange}
          >
            <option value="">Select a job type</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.jobType}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="jobDes">
            Job Description:
          </label>
          <textarea
            id="jobDes"
            name="jobDes"
            rows="4"
            className={`form-control ${errors.jobDes ? "is-invalid" : ""}`}
            placeholder="Describe the role and responsibilities"
            value={form.jobDes}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.jobDes}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="reqQuali">
            Job Qualifications:
          </label>
          <textarea
            id="reqQuali"
            name="reqQuali"
            rows="4"
            className={`form-control ${errors.reqQuali ? "is-invalid" : ""}`}
            placeholder="Enter one qualification per line"
            value={form.reqQuali}
            onChange={handleChange}
          />
          <div className="form-text">Enter one qualification per line.</div>
          <div className="invalid-feedback">{errors.reqQuali}</div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Posting..." : "Post Job"}
        </button>
      </form>
    </>
  );
};

export { AddJob };

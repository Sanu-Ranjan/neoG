import { useNavigate } from "react-router-dom";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
};

export const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { _id, title, image, startTime, eventType } = event;
  return (
    <div className="col" key={_id} onClick={() => navigate(`/events/${_id}`)}>
      <div className="card border-0 px-0">
        <div className="row row-cols-1 g-0">
          <div className="col m-0" style={{ height: "190px" }}>
            <img
              src={image}
              className="img-fluid rounded"
              alt={title}
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
          <div className="card-img-overlay">
            <span className="badge text-bg-success">{eventType}</span>
          </div>
          <div className="col">
            <div className="card-body p-0">
              <small className="text-body-secondary">
                {formatDate(startTime)} {formatTime(startTime)}
              </small>
              <h5 className="card-title">{title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

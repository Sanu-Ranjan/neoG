import { Header } from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

const eventsApi = import.meta.env.VITE_EVENTS_API;

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

const Spinner = () => (
  <div className="text-center mt-5">
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const EventDetails = () => {
  const { eventId } = useParams();
  const { data, loading, error } = useFetch(`${eventsApi}/events/${eventId}`);

  const event = data?.data?.data;

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-danger text-center mt-5">Error loading event</p>;
  if (!event) return null;

  return (
    <main className="container-md py-4">
      <Header />
      <div className="row  g-5">
        {/* left col */}
        <div className="col-12 col-md-8">
          <h1 className="fw-bold mb-1">{event.title}</h1>
          <p className="text-body-secondary mb-4">
            Hosted By: <strong className="text-body">{event.hostedBy}</strong>
          </p>

          {event.image && (
            <div className="mb-4" style={{ maxWidth: "540px" }}>
              <img
                src={event.image}
                alt={event.title}
                className="img-fluid rounded-3 w-100"
                style={{ objectFit: "cover", maxHeight: "340px" }}
              />
            </div>
          )}

          <h4 className="fw-bold mb-2">Details:</h4>
          <p className="text-body-secondary lh-lg mb-4">{event.description}</p>

          {(event.dressCode || event.ageRestriction) && (
            <>
              <h4 className="fw-bold mb-2">Additional Information:</h4>
              {event.dressCode && (
                <p className="mb-1">
                  <strong>Dress Code:</strong>&nbsp;&nbsp;{event.dressCode}
                </p>
              )}
              {event.ageRestriction && (
                <p className="mb-4">
                  <strong>Age Restrictions:</strong>&nbsp;&nbsp;
                  {event.ageRestriction}
                </p>
              )}
            </>
          )}

          {event.tags?.length > 0 && (
            <>
              <h4 className="fw-bold mb-3">Event Tags:</h4>
              <div className="d-flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge rounded-pill px-3 py-2"
                    style={{ backgroundColor: "#e8175d", fontSize: "0.85rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* right col */}
        <div className="col-12 col-md-4">
          <div className="border rounded-3 p-4 mb-4">
            <div className="d-flex gap-2 align-items-start mb-3">
              <i className="bi bi-clock text-body-secondary mt-1"></i>
              <span
                className="text-body-secondary"
                style={{ fontSize: "0.92rem", lineHeight: "1.6" }}
              >
                {formatDate(event.startTime)} at {formatTime(event.startTime)}{" "}
                <br />
                to {formatDate(event.endTime)} at {formatTime(event.endTime)}
              </span>
            </div>

            {event.venue && (
              <div className="d-flex gap-2 align-items-start mb-3">
                <i className="bi bi-geo-alt text-body-secondary mt-1"></i>
                <span
                  className="text-body-secondary"
                  style={{ fontSize: "0.92rem", lineHeight: "1.6" }}
                >
                  {event.venue}
                  <br />
                  {event.address}
                </span>
              </div>
            )}

            {event.price > 0 && (
              <p className="fw-semibold mb-0">
                ₹ {event.price.toLocaleString()}
              </p>
            )}
          </div>

          {event.speakers?.length > 0 && (
            <>
              <h5 className="fw-bold mb-3">
                Speakers: ({event.speakers.length})
              </h5>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {event.speakers.map((speaker, i) => (
                  <div
                    key={i}
                    className="border rounded-3 p-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <img
                      src={speaker.photo || "https://via.placeholder.com/60"}
                      alt={speaker.name}
                      className="rounded-circle mb-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <p className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                      {speaker.name}
                    </p>
                    <p
                      className="text-body-secondary mb-0"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {speaker.role}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

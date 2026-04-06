import { useState } from "react";
import { Header } from "./components/Header";
import { EventCard } from "./components/EventCard";
import { MeetupTitle } from "./components/MeetupTitle";
import useFetch from "./useFetch";
const eventsApi = import.meta.env.VITE_EVENTS_API;

const Events = ({ eventList }) => {
  if (eventList?.length === 0) {
    return <p>Currently there are no events please come back later</p>;
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xxl-3  g-5 mt-3">
        {eventList?.map?.((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </>
  );
};

const Spinner = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-secondary text-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

function App() {
  const { data, loading, error } = useFetch(`${eventsApi}/events`);
  const [eventType, setEventType] = useState("Both");
  const [search, setSearch] = useState("");

  console.log(search);

  const eventsList = data?.data?.data;

  const filteredEvents =
    eventType === "Both"
      ? eventsList
      : eventsList?.filter?.((event) => event.eventType == eventType);

  const filteredByTags = filteredEvents?.filter?.(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <>
      <Header setSearch={setSearch} />
      <main className="container-md">
        <section>
          <MeetupTitle setEvent={setEventType} />
        </section>
        <section>
          {loading ? <Spinner /> : <Events eventList={filteredByTags} />}
        </section>
      </main>
    </>
  );
}

export default App;

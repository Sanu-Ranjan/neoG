export const MeetupTitle = ({ setEvent }) => {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 mt-3 pt-2 g-3">
        <div className="col">
          <div className="d-flex justify-content-sm-start justify-content-center">
            <h1 style={{ fontFamily: "DM Sans, sans-serif" }}>Meetup Events</h1>
          </div>
        </div>
        <div className="col pt-2">
          <div className="d-flex justify-content-sm-end justify-content-center row">
            <div className="col-9 col-sm-10 col-md-8 col-lg-6 col-xl-5 w-45 ">
              <select
                className="form-select text-sm-start text-center"
                defaultValue="Both"
                onChange={(event) => setEvent(event.target.value)}
              >
                <option value="Both" disabled>
                  Select Event Type
                </option>
                <option value="Both">Both</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

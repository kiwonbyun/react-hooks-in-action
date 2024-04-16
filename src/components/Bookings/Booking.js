import React from "react";

const Booking = ({ booking, bookable }) => {
  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <label>Title</label>
      <p>{title}</p>

      <label>Bookable</label>
      <p>{bookable.title}</p>

      <label>Booking date</label>
      <p>{new Date(date).toDateString()}</p>

      <label>Session</label>
      <p>{session}</p>

      {notes && (
        <>
          <label>Notes</label>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
};

export default Booking;

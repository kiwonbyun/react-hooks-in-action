import React from "react";
import Booking from "./Booking";
import { useUser } from "../Users/UserContext";

const BookingDetails = ({ booking, bookable }) => {
  const [user] = useUser();

  const isBooker = booking && user && booking.bookerId === +user.id;

  return (
    <div className="booking-details">
      <h2>
        BookingDetails
        {isBooker && (
          <span className="controls">
            <button className="btn">Edit</button>
          </span>
        )}
      </h2>
      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div>
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;

import React, { useEffect, useState } from "react";
import WeekPicker from "./WeekPicker";
import { getWeek, shortISO } from "../../utils/date-wrangler";
import BookingGrid from "./BookingGrid";
import BookingDetails from "./BookingDetails";
import { useBookingParams, useBookings } from "./BooingHooks";

const Bookings = ({ bookable }) => {
  const [booking, setBooking] = useState(null);
  const { date } = useBookingParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);

  const { bookings } = useBookings(bookable?.id, week.start, week.end);
  const selectedBookings = bookings?.[booking?.session]?.[booking.date];

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart]);

  return (
    <div className="bookings">
      <div>
        <WeekPicker />
        <BookingGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  );
};

export default Bookings;

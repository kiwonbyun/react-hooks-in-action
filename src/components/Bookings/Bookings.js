import React, { useReducer, useState } from "react";
import WeekPicker from "./WeekPicker";
import weekReducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import BookingGrid from "./BookingGrid";
import BookingDetails from "./BookingDetails";

const Bookings = ({ bookable }) => {
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);
  const [booking, setBooking] = useState(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
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

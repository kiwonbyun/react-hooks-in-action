import React, { useRef } from "react";
import { useBookingParams } from "./BooingHooks";
import { addDays, shortISO } from "../../utils/date-wrangler";

const WeekPicker = () => {
  const textboxRef = useRef(null);
  const { date, setBookingsDate: goToDate } = useBookingParams();

  const dates = {
    prev: shortISO(addDays(date, -7)),
    next: shortISO(addDays(date, 7)),
    today: shortISO(new Date()),
  };

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => goToDate(dates.prev)}>
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => goToDate(dates.today)}>
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            placeholder="e.g. 2024-01-20"
            ref={textboxRef}
            defaultValue={dates.today}
          />
          <button
            className="go btn"
            onClick={() => goToDate(textboxRef.current.value)}
          >
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => goToDate(dates.next)}>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default WeekPicker;

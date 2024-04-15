import React, { useReducer, useRef, useState } from "react";
import weekReducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(weekReducer, date, getWeek);
  const [dateText, setDateText] = useState("2024-03-30");

  const goToDate = () => {
    dispatch({ type: "SET_DATE", payload: dateText });
  };

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            placeholder="e.g. 2024-01-20"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />
          <button className="go btn" onClick={goToDate}>
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;

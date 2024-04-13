import React, { useReducer } from "react";
import weekReducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";

const WeekPicker = ({ date }) => {
  const [week, dispatch] = useReducer(weekReducer, date, getWeek);

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <span>Today</span>
        </button>

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

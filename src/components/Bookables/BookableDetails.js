import React, { useState } from "react";
import db from "../../static.json";

const BookableDetails = ({ bookable }) => {
  const { sessions, days } = db;
  const [hasDetails, setHasDetails] = useState(false);

  const toggleDetail = () => {
    setHasDetails((has) => !has);
  };

  return bookable ? (
    <div className="bookable-details">
      <div className="item">
        <div className="item-header">
          <h2>{bookable.title}</h2>
          <span className="controls">
            <label>
              <input
                type="checkbox"
                checked={hasDetails}
                onChange={toggleDetail}
              />
              Show Details
            </label>
          </span>
        </div>

        <p>{bookable.notes}</p>

        {hasDetails && (
          <div className="item-details">
            <h3>Availability</h3>
            <div className="bookable-availability">
              <ul>
                {bookable.days.sort().map((d) => (
                  <li key={d}>{days[d]}</li>
                ))}
              </ul>
              <ul>
                {bookable.sessions.map((s) => (
                  <li key={s}>{sessions[s]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default BookableDetails;

import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import db from "../../static.json";
import { getUniqueValues } from "../../utils/common";
import reducer from "./reducer";
import { getData } from "../../utils/api";
import Spinner from "../UI/Spinner";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: false,
  bookables: [],
  isLoading: true,
  error: false,
};

const BookablesList = () => {
  const { sessions, days } = db;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, hasDetails, bookables, isLoading, error } =
    state;
  const timerRef = useRef(null);

  const bookablesInGroup = bookables.filter((item) => item.group === group);
  const groups = getUniqueValues(bookables, "group");
  const bookable = bookablesInGroup[bookableIndex];

  const changeBookable = (index) => {
    dispatch({ type: "SET_BOOKABLE", payload: index });
  };

  const changeGroup = (e) => {
    dispatch({ type: "SET_GROUP", payload: e.target.value });
  };

  const nextBookable = () => {
    dispatch({ type: "NEXT_BOOKABLE" });
  };

  const toggleDetail = () => {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

    getData("http://localhost:3001/bookables")
      .then((bookable) => {
        dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookable });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_BOOKABLES_ERROR", payload: error });
      });
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: "NEXT_BOOKABLE" });
    }, 3000);

    return () => stopInterval();
  }, []);

  function stopInterval() {
    clearInterval(timerRef.current);
  }

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <div>
        <select onChange={changeGroup}>
          {groups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((item, idx) => (
            <li
              key={item.id}
              className={idx === bookableIndex ? "selected" : null}
            >
              <button className="btn" onClick={() => changeBookable(idx)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" autoFocus onClick={nextBookable}>
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
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
                <button className="btn" onClick={stopInterval}>
                  Stop
                </button>
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
      )}
    </Fragment>
  );
};

export default BookablesList;

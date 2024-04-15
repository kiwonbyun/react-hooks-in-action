import React, { Fragment, useEffect, useRef, useState } from "react";
import { getUniqueValues } from "../../utils/common";

import { getData } from "../../utils/api";
import Spinner from "../UI/Spinner";

const BookablesList = ({ bookable, setBookable }) => {
  // const { group, bookableIndex, bookables, isLoading, error } = state;
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nextButtonRef = useRef(null);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((item) => item.group === group);
  const groups = getUniqueValues(bookables, "group");

  const changeBookable = (selectBookable) => {
    setBookable(selectBookable);
    nextButtonRef.current.focus();
  };

  const changeGroup = (e) => {
    const bookablesInSelectedGroup = bookables.filter(
      (item) => item.group === e.trget.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  };

  const nextBookable = () => {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  };

  useEffect(() => {
    console.log("re");
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <Spinner />;

  return (
    <div>
      <select onChange={changeGroup}>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((item) => (
          <li
            key={item.id}
            className={item.id === bookable.id ? "selected" : null}
          >
            <button className="btn" onClick={() => changeBookable(item)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          autoFocus
          onClick={nextBookable}
          ref={nextButtonRef}
        >
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookablesList;

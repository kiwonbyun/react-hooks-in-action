import React from "react";
import { getUniqueValues } from "../../utils/common";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BookablesList = ({ bookable, bookables = [], getUrl }) => {
  const navigate = useNavigate();

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter((item) => item.group === group);
  const groups = getUniqueValues(bookables, "group");

  const changeGroup = (e) => {
    const bookablesInSelectedGroup = bookables.filter(
      (item) => item.group === e.target.value
    );
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  };

  const nextBookable = () => {
    const i = bookablesInGroup.findIndex((b) => b.id === bookable.id);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  };

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
            <Link className="btn" to={getUrl(item.id)} replace={true}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" autoFocus onClick={nextBookable}>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookablesList;

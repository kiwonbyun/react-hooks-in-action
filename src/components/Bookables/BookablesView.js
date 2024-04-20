import React from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

const BookablesView = () => {
  const { id } = useParams();
  const { data: bookables = [] } = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables"),
    {
      suspense: true,
    }
  );

  const bookable =
    bookables.find((b) => +b.id === parseInt(id, 10)) || bookables[0];

  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id) => `/bookables/${id}`}
        />

        <p className="controls">
          <Link to="/bookables/new" replace={true} className="btn">
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  );
};

export default BookablesView;

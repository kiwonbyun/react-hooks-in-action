import React, { useCallback, useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";
import { useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";
import Spinner from "../UI/Spinner";
import { Link } from "react-router-dom";

const BookablesView = () => {
  const { id } = useParams();
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch("http://localhost:3001/bookables");

  const bookable =
    bookables.find((b) => +b.id === parseInt(id, 10)) || bookables[0];

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    return <Spinner />;
  }

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

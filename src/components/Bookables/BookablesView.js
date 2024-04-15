import React, { useCallback, useState } from "react";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

const BookablesView = () => {
  const [bookable, setBookable] = useState();

  const updateBookable = useCallback((selected) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);

  return (
    <>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
};

export default BookablesView;

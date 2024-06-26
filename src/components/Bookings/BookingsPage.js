import React, { useState } from "react";
import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";
import useFetch from "../../utils/useFetch";
import { useBookingParams } from "./BooingHooks";
import { shortISO } from "../../utils/date-wrangler";
import Spinner from "../UI/Spinner";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

const BookingsPage = () => {
  const { data: bookables = [] } = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables"),
    {
      suspense: true,
    }
  );
  const { date, bookableId } = useBookingParams();

  const bookable = bookables.find((b) => +b.id === bookableId) || bookables[0];

  const getUrl = (id) => {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  };

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;

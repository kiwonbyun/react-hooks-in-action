import { useMemo } from "react";
import { isDate, shortISO } from "../../utils/date-wrangler";
import { getGrid, transformBookings } from "./GridBuilder";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

export function useBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = "http://localhost:3001/bookings";

  const queryString = `bookableId=${bookableId}`;

  const query = useQuery(["bookings", bookableId, start, end], () =>
    getData(`${urlRoot}?${queryString}`)
  );

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query,
  };
}

export function useGrid(bookable, startDate) {
  return useMemo(
    () => (bookable ? getGrid(bookable, startDate) : {}),
    [bookable, startDate]
  );
}

export function useBookingParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchDate = searchParams.get("date");
  const bookableId = searchParams.get("bookableId");

  const date = isDate(searchDate) ? new Date(searchDate) : new Date();
  const idInt = parseInt(bookableId, 10);
  const hasId = !isNaN(idInt);

  const setBookingsDate = (date) => {
    const parmas = {};
    if (hasId) {
      parmas.bookableId = idInt;
    }
    if (isDate(date)) {
      parmas.date = date;
    }
    if (parmas.date || parmas.bookableId !== undefined) {
      setSearchParams(parmas, { replace: true });
    }
  };

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate,
  };
}

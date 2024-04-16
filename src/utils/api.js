import { shortISO } from "./date-wrangler";

export const getData = (url) => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error("There was a problem fetching data.");
    }
    return res.json();
  });
};

export const getBooking = (bookableId, startDate, endDate) => {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
};

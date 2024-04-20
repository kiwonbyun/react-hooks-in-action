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
  const query = `bookableId=${bookableId}`;
  return getData(`${urlRoot}?${query}`);
};

export function createItem(url, item) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem creating the item!");
    }
    return r.json();
  });
}

export function editItem(url, item) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("There was a problem editing the item!");
    }
    return res.json();
  });
}

export function deleteItem(url) {
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((r) => {
    if (!r.ok) {
      throw new Error("There was a problem deleting the item!");
    }
    return r.json();
  });
}

export const getData = (url) => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error("There was a problem fetching data.");
    }
    return res.json();
  });
};

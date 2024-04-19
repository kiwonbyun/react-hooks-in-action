import { useEffect, useState } from "react";
import { getData } from "./api";

export default function useFetch(url) {
  const [data, setData] = useState();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let doUpdate = true;

    setData(undefined);
    setStatus("loading");
    setError(null);

    getData(url)
      .then((data) => {
        if (doUpdate) {
          setData(data);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (doUpdate) {
          setError(err);
          setStatus("error");
        }
      });

    return () => (doUpdate = false);
  }, [url]);

  return { data, status, error };
}

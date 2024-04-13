import React, { useEffect, useState } from "react";
import WeekPicker from "./WeekPicker";

const BookingsPage = () => {
  const [size, setSize] = useState(getSize());

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="bookings-page">
      BookingsPage
      {size.height}
      <WeekPicker date={new Date()} />
    </main>
  );
};

export default BookingsPage;

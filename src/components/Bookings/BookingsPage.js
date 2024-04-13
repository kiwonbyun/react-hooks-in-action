import React from "react";
import WeekPicker from "./WeekPicker";

const BookingsPage = () => {
  return (
    <main className="bookings-page">
      BookingsPage
      <WeekPicker date={new Date()} />
    </main>
  );
};

export default BookingsPage;

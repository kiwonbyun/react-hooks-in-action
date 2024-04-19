import React from "react";
import BookablesView from "./BookablesView";
import { Route, Routes } from "react-router-dom";

const BookablesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<BookablesView />} />
      <Route path="/:id" element={<BookablesView />} />
      <Route path="/:id/edit" element={null} />
      <Route path="/new" element={null} />
    </Routes>
  );
};

export default BookablesPage;

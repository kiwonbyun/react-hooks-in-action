import React from "react";
import BookablesView from "./BookablesView";
import { Route, Routes } from "react-router-dom";
import BookableEdit from "./BookableEdit";
import BookableNew from "./BookableNew";

const BookablesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<BookablesView />} />
      <Route path="/:id" element={<BookablesView />} />
      <Route path="/:id/edit" element={<BookableEdit />} />
      <Route path="/new" element={<BookableNew />} />
    </Routes>
  );
};

export default BookablesPage;

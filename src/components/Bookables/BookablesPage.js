import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const BookablesView = lazy(() => import("./BookablesView"));
const BookableEdit = lazy(() => import("./BookableEdit"));
const BookableNew = lazy(() => import("./BookableNew"));

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

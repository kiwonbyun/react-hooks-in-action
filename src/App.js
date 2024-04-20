import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import { BrowserRouter } from "react-router-dom";
import UserPicker from "./components/UserPicker/UserPicker";

import { UserProvider } from "./components/Users/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense, lazy } from "react";
import PageSpinner from "./components/UI/PageSpinner";
import ErrorBoundary from "./components/UI/ErrorBoundary";

const BookingsPage = lazy(() => import("./components/Bookings/BookingsPage"));
const BookablesPage = lazy(() =>
  import("./components/Bookables/BookablesPage")
);
const UsersPage = lazy(() => import("./components/Users/UsersPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Booking</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <UserPicker />
            </header>
            <ErrorBoundary
              fallback={
                <>
                  <h1>Something went wrong!</h1>
                  <p>Try reloading the page.</p>
                </>
              }
            >
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/bookables/*" element={<BookablesPage />} />
                  <Route path="/users" element={<UsersPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;

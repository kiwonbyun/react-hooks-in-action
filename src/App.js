import { Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import { BrowserRouter } from "react-router-dom";
import BookingsPage from "./components/Bookings/BookingsPage";
import BookablesPage from "./components/Bookables/BookablesPage";
import UsersPage from "./components/Users/UsersPage";
import UserPicker from "./components/UserPicker/UserPicker";

import UserContext from "./components/Users/UserContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();

  return (
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

          <UserPicker user={user} setUser={setUser} />
        </header>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookables" element={<BookablesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

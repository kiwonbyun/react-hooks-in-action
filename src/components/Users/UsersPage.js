import React, { useState } from "react";
import UsersList from "./UserList";
import UserDetails from "./UserDetails";
import { useUser } from "../Users/UserContext";

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const [loggedInUser] = useUser();

  const currentUser = user || loggedInUser;
  return (
    <div>
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </div>
  );
};

export default UsersPage;

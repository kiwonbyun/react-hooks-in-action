import React, { useContext, useState } from "react";
import UsersList from "./UserList";
import UserDetails from "./UserDetails";
import UserContext from "../Users/UserContext";

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const loggedInUser = useContext(UserContext);

  const currentUser = user || loggedInUser;
  return (
    <div>
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </div>
  );
};

export default UsersPage;

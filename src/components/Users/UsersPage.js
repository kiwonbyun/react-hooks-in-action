import React, { useState } from "react";
import UsersList from "./UserList";
import UserDetails from "./UserDetails";

const UsersPage = () => {
  const [user, setUser] = useState();
  return (
    <div>
      <UsersList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </div>
  );
};

export default UsersPage;

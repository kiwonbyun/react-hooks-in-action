import React, { Suspense, useState } from "react";
import UsersList from "./UserList";
import UserDetails from "./UserDetails";
import { useUser } from "../Users/UserContext";
import { useQueryClient } from "react-query";
import { getData } from "../../utils/api";
import PageSpinner from "../UI/PageSpinner";

const UsersPage = () => {
  // const [user, setUser] = useState(null);
  // const [loggedInUser] = useUser();

  // const currentUser = user || loggedInUser;
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;
  const queryClient = useQueryClient();

  function switchUser(nextUser) {
    setSelectedUser(nextUser);

    queryClient.prefetchQuery(["user", nextUser.id], () =>
      getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    queryClient.prefetchQuery(
      `http://localhost:3001/img/${nextUser.img}`,
      () =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = `http://localhost:3001/img/${nextUser.img}`;
        })
    );
  }

  return user ? (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser} />

      <Suspense fallback={<PageSpinner />}>
        <UserDetails user={user} />
      </Suspense>
    </main>
  ) : (
    <PageSpinner />
  );
};

export default UsersPage;

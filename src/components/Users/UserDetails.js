import React, { Suspense } from "react";
import Avatar from "./Avatar";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";
import UserBookings from "./UserBookings";
import UserTodos from "./UserToDos";

const UserDetails = ({ userID, isPending }) => {
  const { data: user } = useQuery(
    ["user", userID],
    () => getData(`http://localhost:3001/users/${userID}`),
    { suspense: true }
  );
  if (!user) return null;
  return (
    <div className={isPending ? "item user user-pending" : "item user"}>
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>

      <Avatar
        src={`http://localhost:3001/img/${user.img}`}
        alt={user.name}
        fallbackSrc="http://localhost:3001/img/avatar.gif"
      />

      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>

      <Suspense fallback={<p>Loading user bookings...</p>}>
        <UserBookings id={userID} />
      </Suspense>

      <Suspense fallback={<p>Loading user todos...</p>}>
        <UserTodos id={userID} />
      </Suspense>
    </div>
  );
};

export default UserDetails;

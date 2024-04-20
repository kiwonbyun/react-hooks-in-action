import React from "react";
import Avatar from "./Avatar";

const UserDetails = ({ user }) => {
  if (!user) return null;
  return (
    <div className="item user">
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
    </div>
  );
};

export default UserDetails;

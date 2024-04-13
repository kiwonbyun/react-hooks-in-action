import { useState } from "react";
import db from "../../static.json";

export default function UserPicker() {
  const { users } = db;
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const handleChangeUser = (e) => {
    const value = JSON.parse(e.target.value);
    setSelectedUser(value);
  };
  return (
    <select onChange={handleChangeUser}>
      {users.map((u) => (
        <option key={u.id} value={JSON.stringify(u)}>
          {u.name}
        </option>
      ))}
    </select>
  );
}

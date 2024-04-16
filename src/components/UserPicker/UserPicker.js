import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

export default function UserPicker({ user, setUser }) {
  const [users, setUsers] = useState(null);

  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((user) => +user.id === selectedId);

    setUser(selectedUser);
  };

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setUser(data[0]);
      });
  }, []);

  if (!users) return <Spinner />;
  return (
    <select onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}

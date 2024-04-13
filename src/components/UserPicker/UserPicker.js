import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

export default function UserPicker() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (!users) return <Spinner />;
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}

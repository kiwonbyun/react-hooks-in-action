import { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { useUser } from "../Users/UserContext";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

export default function UserPicker() {
  const [user, setUser] = useUser();
  const { data: users = [], status } = useQuery(["users"], () =>
    getData("http://localhost:3001/users")
  );

  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((user) => +user.id === selectedId);

    setUser(selectedUser);
  };

  useEffect(() => {
    if (users) {
      setUser(users[0]);
    }
  }, [users, setUser]);

  if (status === "loading") return <Spinner />;
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

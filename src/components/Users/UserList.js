import Spinner from "../UI/Spinner";
import useFetch from "../../utils/useFetch";

export default function UsersList({ user, setUser }) {
  const {
    data: users = [],
    status,
    error,
  } = useFetch("http://localhost:3001/users");

  if (status === "loading") return <Spinner />;

  if (status === "error") return <p>{error.message}</p>;

  return (
    <ul className="users items-list-nav">
      {users.map((u) => (
        <li key={u.id} className={u.id === user.id ? "selected" : null}>
          <button className="btn" onClick={() => setUser(u)}>
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

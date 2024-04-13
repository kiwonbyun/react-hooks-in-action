import { Fragment, useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import { getData } from "../../utils/api";

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:3001/users")
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={i === userIndex ? "selected" : null}>
            <button className="btn" onClick={() => setUserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}

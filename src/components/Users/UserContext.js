import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserSetContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error("The UserProvider is required.");
  }
  return [user, setUser];
};

import { createContext, useState } from "react";

const UserContext = createContext();
export const UserSetContext = createContext();
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

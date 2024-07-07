import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const { user } = useAuth();

//   return (
//     <UserContext.Provider value={{ user }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

export const UserProvider = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

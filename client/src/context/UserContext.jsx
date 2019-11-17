import * as React from 'react';
import {useState} from 'react';

const UserContext = React.createContext(null);
export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export default UserContext;

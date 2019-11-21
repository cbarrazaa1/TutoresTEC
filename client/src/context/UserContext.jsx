import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {SERVER_URL} from '../config';
import {useHistory, useLocation} from 'react-router-dom';

const UserContext = React.createContext(null);
export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  const history = useHistory();
  const location = history.location;
  const [isValidToken, setIsValidToken] = useState(false);
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(`${SERVER_URL}/api/auth/validateToken`, {
        method: 'GET',
        credentials: 'include',
      });
      const json = await response.json();
      setIsValidToken(json.success);

      setUser(json.user);

      if (!json.success) {
        if (location.pathname === '/' || location.pathname === '/signup') {
          return;
        }
        history.replace('/');
      }
    }
    checkToken();
  }, [location]);

  return {user, setUser, isValidToken};
}

export default UserContext;

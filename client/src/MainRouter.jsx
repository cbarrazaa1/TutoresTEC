import * as React from 'react';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import HomeView from './views/HomeView';
import {useState, useEffect, useContext} from 'react';
import UserContext, {UserContextProvider} from './context/UserContext';

function MainRouter() {
  const [isValidToken, setIsValidToken] = useState(false);
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    async function checkToken() {
      const response = await fetch('http://localhost:3001/api/auth/validateToken', {
        method: 'GET',
        credentials: 'include',
      });
      const json = await response.json();
      setIsValidToken(json.success);
      setUser(json.user);
    }
    checkToken();
  }, []);

  return (
    <Switch>
      <Route exact={true} path="/">
        {isValidToken ? <Redirect to="/home" /> : <LoginView />}
      </Route>
      <Route path="/signup">
        <SignUpView />
      </Route>
      <Route path="/home">
        <HomeView />
      </Route>
    </Switch>
  );
}

export default MainRouter;

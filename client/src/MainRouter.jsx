import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import UserContext from './context/UserContext';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import {SERVER_URL} from './config';

function MainRouter() {
  const [isValidToken, setIsValidToken] = useState(false);
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    async function checkToken() {
      const response = await fetch(`${SERVER_URL}/api/auth/validateToken`, {
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

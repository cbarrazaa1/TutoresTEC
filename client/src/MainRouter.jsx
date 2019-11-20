import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UserContext, {useCurrentUser} from './context/UserContext';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import {SERVER_URL} from './config';

function MainRouter({history}) {
  const {isValidToken} = useCurrentUser(history);

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

export default withRouter(MainRouter);

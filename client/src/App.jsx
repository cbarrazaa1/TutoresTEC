import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import HomeView from './views/HomeView';
import {Navbar} from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';
import {useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie';
import UserContext, {UserContextProvider} from './context/UserContext';

function App() {
  const [navbar, {height}] = useDimensions();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const response = await fetch('http://localhost:3001/api/auth/validateToken', {
        method: 'GET',
        credentials: 'include',
      });
      const json = await response.json();
      setIsValidToken(json.success);
    }
    checkToken();
  }, []);

  return (
    <div style={{height: `calc(100% - ${height}px)`}}>
      <Navbar ref={navbar} bg="primary" variant="dark">
        <Navbar.Brand>TutoresTEC</Navbar.Brand>
      </Navbar>
      <BrowserRouter>
        <UserContextProvider>
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
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

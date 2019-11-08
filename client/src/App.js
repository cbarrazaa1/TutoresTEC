import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import {Navbar} from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" style={{backgroundColor: 'red'}}>
        <Navbar.Brand>TutoresTEC</Navbar.Brand>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/">
            <LoginView />
          </Route>
          <Route path="/signup">
            <SignUpView />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

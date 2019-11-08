import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import {Navbar} from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';

function App() {
  const [navbar, {height}] = useDimensions();

  return (
    <div style={{height: `calc(100% - ${height}px)`}}>
      <Navbar ref={navbar} bg="primary" variant="dark">
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
    </div>
  );
}

export default App;

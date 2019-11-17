import React from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap';
import useDimensions from 'react-use-dimensions';
import MainRouter from './MainRouter';
import {BrowserRouter} from 'react-router-dom';
import {UserContextProvider} from './context/UserContext';

function App() {
  const [navbar, {height}] = useDimensions();

  return (
    <div style={{height: `calc(100% - ${height}px)`}}>
      <Navbar ref={navbar} bg="primary" variant="dark">
        <Navbar.Brand>TutoresTEC</Navbar.Brand>
      </Navbar>
      <BrowserRouter>
        <UserContextProvider>
          <MainRouter />
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

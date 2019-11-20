import React from 'react';
import {Navbar} from 'react-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import useDimensions from 'react-use-dimensions';
import './App.css';
import {UserContextProvider} from './context/UserContext';
import MainRouter from './MainRouter';

function App() {
  const [navbar, {height}] = useDimensions();

  return (
    <div style={{height: `calc(100% - ${height}px)`, paddingTop: height}}>
      <Navbar ref={navbar} bg="primary" variant="dark" fixed="top">
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

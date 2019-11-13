import * as React from 'react';
import {useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import SideBar from '../components/SideBar';

function HomeView() {
  return (
    <div style={styles.root}>
      <SideBar />
      <Switch>
        <Route path="/home">
          <p>Hi</p>
        </Route>
      </Switch>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
};

export default HomeView;

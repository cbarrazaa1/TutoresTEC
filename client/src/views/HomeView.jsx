import * as React from 'react';
import {useState} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import SideBar from '../components/SideBar';
import NotificationsView from './NotificationsView';

function HomeView() {
  return (
    <div style={styles.root}>
      <SideBar />
      <Switch>
        <Route exact path="/home"></Route>
        <Route exact path="/home/notifications">
          <NotificationsView />
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

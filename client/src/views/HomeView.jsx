import * as React from 'react';
import {useState} from 'react';
import {Card} from 'react-bootstrap';
import {Link, Switch, Route} from 'react-router-dom';
import SideBar from '../components/SideBar';
import Post from '../components/Post';

function HomeView() {
  return (
    <div style={styles.root}>
      <SideBar />
      <Switch>
        <Route path="/home">
          <div style={styles.container}>
            <h3 style={styles.title}>Latest Posts</h3>
            <Post title="This is a post" author="tutor" description="aodfiajsdiofaenfnaeoif aifjadnf aeifae i" />
          </div>
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
    padding: '10px',
  },
  title: {
    fontWeight: 200,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
};

export default HomeView;

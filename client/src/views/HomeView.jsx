import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import Post from '../components/Post';
import SideBar from '../components/SideBar';
import NotificationsView from './NotificationsView';
import BecomeTutorView from './BecomeTutorView';

function HomeView() {
  return (
    <div style={styles.root}>
      <SideBar />
      <div style={{paddingLeft: 350, flex: 1}}>
        <Switch>
          <Route exact path="/home">
            <div style={styles.container}>
              <h3 style={styles.title}>Latest Posts</h3>
              <Post
                title="This is a post"
                author="tutor"
                description="aodfiajsdiofaenfnaeoif aifjadnf aeifae i"
              />
            </div>
          </Route>
          <Route exact path="/home/notifications">
            <NotificationsView />
          </Route>
          <Route exact path="/home/becometutor">
            <BecomeTutorView />
          </Route>
        </Switch>
      </div>
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
  title: {
    fontWeight: 200,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '10px',
  },
};

export default HomeView;

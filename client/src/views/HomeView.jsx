import * as React from 'react';
import {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {FiPlusCircle} from 'react-icons/fi';
import {Button} from 'react-bootstrap';
import Post from '../components/Post';
import SideBar from '../components/SideBar';
import NotificationsView from './NotificationsView';
import BecomeTutorView from './BecomeTutorView';
import CreatePostView from './CreatePostView';
import SearchView from './SearchView';

function HomeView({history}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const url = 'http://localhost:3001/api/posts/all?populated=true';
      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      setPosts(json.posts);
    }
    fetchPosts();
  }, []);

  const onCreatePostClick = e => {
    e.preventDefault();
    history.push('/home/createPost');
  };

  return (
    <div style={styles.root}>
      <SideBar />
      <div style={{paddingLeft: 350, flex: 1}}>
        <Switch>
          <Route exact path="/home">
            <div style={styles.container}>
              <h3 style={styles.title}>Latest Posts</h3>
              <div style={styles.options}>
                <Button variant="success" onClick={onCreatePostClick}>
                  <FiPlusCircle></FiPlusCircle> Create Post
                </Button>
              </div>

              {posts.map(post => {
                return (
                  <Post
                    key={post._id}
                    title={post.title}
                    author={post.author.name}
                    description={post.content}
                  />
                );
              })}
            </div>
          </Route>
          <Route exact path="/home/notifications">
            <NotificationsView />
          </Route>
          <Route exact path="/home/becometutor">
            <BecomeTutorView />
          </Route>
          <Route exact path="/home/createPost">
            <CreatePostView />
          </Route>
          <Route exact path="/home/search">
            <SearchView />
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
  options: {
    marginBottom: '10px',
  },
};

export default withRouter(HomeView);

import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import UserContext from '../context/UserContext';
import {Form, Button, Card} from 'react-bootstrap';
import {FiPlusCircle} from 'react-icons/fi';
import {Router, Link, withRouter} from 'react-router-dom';
import {SERVER_URL} from '../config';

function CreatePostView({history}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {user} = useContext(UserContext);

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const onContentChange = e => {
    setContent(e.target.value);
  };

  const onCreatePostClick = async e => {
    e.preventDefault();

    if (title === '' || content === '') {
      alert('Please fill in all requested information');
      return;
    }
    const url = `${SERVER_URL}/api/posts/create`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: user._id,
        title: title,
        content: content,
      }),
    });
    const json = await response.json();
    if (json.success) {
      alert('Post created successfully');
      history.replace('/home');
    }
  };
  return (
    <div style={styles.root}>
      <h3 style={styles.title}>Create Post</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={onTitleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="Content"
            type="text"
            onChange={onContentChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button variant="primary" onClick={onCreatePostClick}>
            Create Post
          </Button>{' '}
        </Form.Group>
      </Form>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  title: {
    fontWeight: 200,
  },
};

export default withRouter(CreatePostView);

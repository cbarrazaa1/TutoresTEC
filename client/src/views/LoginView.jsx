import * as React from 'react';
import {useContext, useState} from 'react';
import {Button, Card, Form, InputGroup} from 'react-bootstrap';
import {MdEmail, MdLock} from 'react-icons/md';
import {Link, withRouter} from 'react-router-dom';
import {useCurrentUser} from '../context/UserContext';
import {SERVER_URL} from '../config';

function LoginView({history}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useCurrentUser();

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onLoginClick = async e => {
    e.preventDefault();

    if (email === '') {
      alert('Please enter your email.');
      return;
    }

    if (password === '') {
      alert('Please enter your password.');
      return;
    }

    const response = await fetch(`${SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email, password}),
    });
    const json = await response.json();

    if (json.success) {
      setUser(json.user);
      history.push('/home');
    } else {
      alert(json.message);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <Form.Group>
            <h2>Login</h2>
            <p>Enter your login information below.</p>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <MdEmail />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Email"
                type="email"
                onChange={onEmailChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <MdLock />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Password"
                type="password"
                onChange={onPasswordChange}
              />
            </InputGroup>
          </Form.Group>

          <Button style={styles.button} onClick={onLoginClick}>
            Login
          </Button>
        </Card.Body>

        <Card.Footer>
          Don't have an account? <Link to="/signup">Sign up here!</Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  card: {
    width: '30%',
    minWidth: '300px',
  },
  button: {
    width: '100%',
  },
};

export default withRouter(LoginView);

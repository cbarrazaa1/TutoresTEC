import * as React from 'react';
import {Button, Form, Card} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onLoginClick = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await response.json();
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <Card style={styles.card}>
        <Form>
          <Form.Group>
            <Form.Control
              placeholder="Email"
              type="email"
              onChange={onEmailChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              placeholder="Password"
              type="password"
              onChange={onPasswordChange}
            />
          </Form.Group>
        </Form>
        <Button style={styles.button} onClick={onLoginClick}>
          Login
        </Button>
      </Card>
      <p>
        Don't have an account?<Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    padding: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: '25%',
  },
  button: {
    width: '120px',
  },
};

export default LoginView;

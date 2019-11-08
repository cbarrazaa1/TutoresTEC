import * as React from 'react';
import {Button, Form, Card, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {MdEmail, MdLock} from 'react-icons/md';

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

    if (email === '') {
      alert('Please enter your email.');
      return;
    }

    if (password === '') {
      alert('Please enter your password.');
      return;
    }

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

export default LoginView;

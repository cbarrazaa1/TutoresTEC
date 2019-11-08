import * as React from 'react';
import {Button, Form, Card} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';

function SignUpView() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [semester, setSemester] = useState('');
  const [bachelor, setBachelor] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onNameChange = e => {
    setName(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onConfirmedPasswordChange = e => {
    setConfirmedPassword(e.target.value);
  };

  const onSemesterChange = e => {
    setSemester(e.target.value);
  };

  const onBachelorChange = e => {
    setBachelor(e.target.value);
  };

  const onSignUpClick = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        description: {
          semester,
          bachelor,
        },
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div style={styles.container}>
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
            placeholder="Name"
            type="text"
            onChange={onNameChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Password"
            type="password"
            onChange={onPasswordChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Confirm password"
            type="password"
            onChange={onConfirmedPasswordChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Semester"
            type="number"
            onChange={onSemesterChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            placeholder="Bachelor"
            type="text"
            onChange={onBachelorChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={onSignUpClick}>Sign up</Button>
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
};

export default SignUpView;

import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import {Button, Card, Col, Form, InputGroup} from 'react-bootstrap';
import {FaGraduationCap} from 'react-icons/fa';
import {IoIosRocket} from 'react-icons/io';
import {MdEmail, MdLock, MdPerson} from 'react-icons/md';
import {withRouter} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {SERVER_URL} from '../config';

function SignUpView({history}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [semester, setSemester] = useState('');
  const [bachelor, setBachelor] = useState('');
  const [bachelorList, setBachelorList] = useState([]);
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    async function getBachelorList() {
      const response = await fetch(`${SERVER_URL}/api/bachelors/all`, {
        method: 'GET',
      });

      const json = await response.json();
      setBachelorList(json.bachelors);
      setBachelor(json.bachelors[0]._id);
    }
    getBachelorList();
  }, []);

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
    console.log(e.target.value);
    setBachelor(e.target.value);
  };

  const onSignUpClick = async e => {
    e.preventDefault();

    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmedPassword === '' ||
      semester === '' ||
      bachelor === ''
    ) {
      alert('Please fill in all requested information.');
      return;
    }

    if (password !== confirmedPassword) {
      alert('Passwords do not match.');
      return;
    }

    const response = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
        semester,
        bachelor,
      }),
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
            <h2>Create account</h2>
            <p>Tell us a bit about yourself.</p>
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
                  <MdPerson />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Name"
                type="text"
                onChange={onNameChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup className="mb-3">
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

            <Form.Group as={Col}>
              <Form.Control
                placeholder="Confirm password"
                type="password"
                onChange={onConfirmedPasswordChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Label>School information</Form.Label>
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaGraduationCap />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" onChange={onBachelorChange}>
                  {bachelorList.map(bachelor => (
                    <option>{bachelor.shortName}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <IoIosRocket />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Semester"
                  type="number"
                  onChange={onSemesterChange}
                  min={0}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Button style={styles.button} onClick={onSignUpClick}>
            Sign Up
          </Button>
        </Card.Body>
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
    width: '35%',
    minWidth: '300px',
  },
  button: {
    width: '100%',
  },
};

export default withRouter(SignUpView);

import * as React from 'react';
import {
  Button,
  Form,
  Card,
  Col,
  InputGroup,
  ListGroup,
  Image,
} from 'react-bootstrap';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {MdEmail, MdLock, MdPerson} from 'react-icons/md';
import {FaGraduationCap, FaSortNumericUp} from 'react-icons/fa';
import {IoIosRocket} from 'react-icons/io';

function HomeView() {
  return (
    // sidebar
    <div style={styles.container}>
      <div style={styles.profile}>
        <Image
          style={styles.profileImg}
          src={require('../img/userprofile.png')}
        />
      </div>
      <ListGroup style={styles.options} as="ul" variant="flush">
        <ListGroup.Item as="li" disabled>
          Search
        </ListGroup.Item>
        <ListGroup.Item as="li" active>
          Home
        </ListGroup.Item>
        <ListGroup.Item as="li" disabled>
          Notifications
        </ListGroup.Item>
        <ListGroup.Item as="li" disabled>
          Inbox
        </ListGroup.Item>
        <ListGroup.Item as="li" disabled>
          My tutors
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    minWidth: '300px',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid black',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    alignSelf: 'center',
  },
  profileImg: {
    width: '150px',
    height: '150px',
  },
  options: {
    padding: '5px',
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default HomeView;

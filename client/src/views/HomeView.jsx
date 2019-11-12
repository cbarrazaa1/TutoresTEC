import * as React from 'react';
import {ButtonGroup, Button, ListGroup, Image} from 'react-bootstrap';
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
        <ListGroup.Item action active>
          Home
        </ListGroup.Item>
        <ListGroup.Item action>Search</ListGroup.Item>
        <ListGroup.Item action>Notifications</ListGroup.Item>
        <ListGroup.Item action>Inbox</ListGroup.Item>
        <ListGroup.Item action>My tutors</ListGroup.Item>
        <ListGroup.Item style={styles.tutorBtnContainer}>
          <Button variant="primary" block>
            Become tutor
          </Button>
        </ListGroup.Item>
        <ListGroup.Item action>Log out</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    height: '100%',
    minWidth: '300px',
    border: 'solid black',
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
    marginTop: '10px',
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
  tutorBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default HomeView;

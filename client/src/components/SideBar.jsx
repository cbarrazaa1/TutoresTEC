import * as React from 'react';
import {FaHome, FaSearch, FaInbox, FaChalkboardTeacher} from 'react-icons/fa';
import {IoIosNotifications} from 'react-icons/io';
import {FiPower} from 'react-icons/fi';
import {Button, ListGroup, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {withRouter} from 'react-router-dom';

function SideBar({history}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isActive = index => {
    return index === activeIndex;
  };

  const onOptionClick = index => {
    switch (index) {
      case 0:
        history.push('/home');
        break;
      case 1:
        break;
      case 2:
        history.push('/home/notifications');
        break;
      case 3:
        break;
      case 4:
        break;
    }
    setActiveIndex(index);
  };

  return (
    <div style={styles.container}>
      <Image style={styles.profileImg} src={require('../img/userprofile.png')} />
      <ListGroup as="ul" variant="flush">
        <ListGroup.Item style={styles.listItem} action active={isActive(0)} onClick={() => onOptionClick(0)}>
          <FaHome style={styles.icon}></FaHome>
          Home
        </ListGroup.Item>
        <ListGroup.Item style={styles.listItem} action active={isActive(1)} onClick={() => onOptionClick(1)}>
          <FaSearch style={styles.icon}></FaSearch>
          Search
        </ListGroup.Item>
        <ListGroup.Item style={styles.listItem} action active={isActive(2)} onClick={() => onOptionClick(2)}>
          <IoIosNotifications style={styles.icon}></IoIosNotifications>
          Notifications
        </ListGroup.Item>
        <ListGroup.Item style={styles.listItem} action active={isActive(3)} onClick={() => onOptionClick(3)}>
          <FaInbox style={styles.icon}></FaInbox>
          Inbox
        </ListGroup.Item>
        <ListGroup.Item style={styles.listItem} action active={isActive(4)} onClick={() => onOptionClick(4)}>
          <FaChalkboardTeacher style={styles.icon}></FaChalkboardTeacher>
          My tutors
        </ListGroup.Item>
        <ListGroup.Item style={styles.tutorBtnContainer}>
          <Button variant="primary" block>
            Become tutor
          </Button>
        </ListGroup.Item>
        <ListGroup.Item style={styles.listItem} action>
          <FiPower style={styles.icon}></FiPower>
          Logout
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
    height: '100%',
    minWidth: '300px',
    borderRight: '#dbdbdb solid 1px',
  },
  profileImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    alignSelf: 'flex-start',
    marginLeft: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  tutorBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: '8px',
  },
};

export default withRouter(SideBar);

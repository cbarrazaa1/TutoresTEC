import * as React from 'react';
import {Button, Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {SERVER_URL} from '../config';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';
import MyTutorRow from '../components/MyTutorRow';
import {FiSearch} from 'react-icons/fi';

function MyTutorsView({history}) {
  const [currTutors, setCurrTutors] = useState([]);
  const [pastTutors, setPastTutors] = useState([]);

  const {user} = useCurrentUser();

  const onFindTutorClick = e => {
    e.preventDefault();
    history.push('/home/search');
  };

  useEffect(() => {
    async function fetchTutors() {
      const response = await fetch(
        `${SERVER_URL}/api/users/myTutors?id=${user._id}`,
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      setCurrTutors(json.current);
      setPastTutors(json.past);
      console.log(json);
    }

    if (user != null) {
      fetchTutors();
    }
  }, [user]);

  const onFinishClick = async session => {
    const conf = window.confirm(
      'Are you sure you want to finish this session?',
    );
    if (conf) {
      let rating = window.prompt('Enter a rating for this tutor. (0 to 5)');
      while (rating < 0 || rating > 5) {
        rating = window.prompt('Enter a rating for this tutor. (0 to 5)');
      }

      const response = await fetch(`${SERVER_URL}/api/sessions/finish`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: session._id,
          tutorID: session.tutor._id,
          studentID: user._id,
          rating,
        }),
      });

      setCurrTutors(prev => prev.filter(curr => curr._id !== session._id));
      session.status = 'closed';
      session.tutor.sessions = session.tutor.sessions.filter(
        curr => curr._id !== session._id,
      );
      setPastTutors(prev => prev.concat(session));
    }
  };

  const onCancelClick = async session => {
    const conf = window.confirm(
      'Are you sure you want to cancel this session?',
    );
    if (conf) {
      const response = await fetch(`${SERVER_URL}/api/sessions/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: session._id,
          tutorID: session.tutor._id,
          studentID: user._id,
        }),
      });

      setCurrTutors(prev => prev.filter(curr => curr._id !== session._id));
    }
  };

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>My Tutors</h3>
      {currTutors.length > 0 ? (
        <h5 style={{marginTop: '12px'}}>Scheduled Sessions</h5>
      ) : (
        <Card>
          <Card.Body>
            <h5>
              You haven't scheduled a tutoring session. Find the perfect tutor,
              schedule a lesson and start learning!
            </h5>
            <Button
              style={{marginTop: '8px'}}
              variant="success"
              onClick={onFindTutorClick}
            >
              <FiSearch></FiSearch> Find a tutor
            </Button>
          </Card.Body>
        </Card>
      )}
      {currTutors.map(currTutor => (
        <MyTutorRow
          key={currTutor.tutor._id}
          tutor={currTutor.tutor}
          start={currTutor.start}
          end={currTutor.end}
          isDone={false}
          onFinishClick={() => onFinishClick(currTutor)}
          onCancelClick={() => onCancelClick(currTutor)}
        />
      ))}
      {pastTutors.length > 0 ? (
        <h5 style={{marginTop: '12px'}}>Past Sessions</h5>
      ) : null}
      {pastTutors.map(pastTutor => (
        <MyTutorRow
          key={pastTutor.tutor._id}
          tutor={pastTutor.tutor}
          start={pastTutor.start}
          end={pastTutor.end}
          isDone={true}
          onFinishClick={() => onFinishClick(pastTutor)}
          onCancelClick={() => onCancelClick(pastTutor)}
        />
      ))}
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

export default withRouter(MyTutorsView);

import * as React from 'react';
import {Button, Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {SERVER_URL} from '../config';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';
import TutorSearchRow from '../components/TutorSearchRow';
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

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>My Tutors</h3>
      {currTutors.length > 0 ? (
        <h5 style={{marginTop: '12px'}}>Current Tutors</h5>
      ) : (
        <Card>
          <Card.Body>
            <h5>
              You haven't scheduled a tutoring session. Find the perfect tutor,
              schedule a lesson and start learning!
            </h5>
            <Button variant="success" onClick={onFindTutorClick}>
              <FiSearch></FiSearch> Find a tutor
            </Button>
          </Card.Body>
        </Card>
      )}
      {currTutors.map(currTutor => (
        <TutorSearchRow
          key={currTutor.tutor._id}
          tutor={currTutor.tutor}
        ></TutorSearchRow>
      ))}
      {pastTutors.length > 0 ? (
        <h5 style={{marginTop: '12px'}}>Past Tutors</h5>
      ) : null}
      {pastTutors.map(pastTutor => (
        <TutorSearchRow
          key={pastTutor.tutor._id}
          tutor={pastTutor.tutor}
        ></TutorSearchRow>
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

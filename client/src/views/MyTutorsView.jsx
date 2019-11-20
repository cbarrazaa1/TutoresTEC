import * as React from 'react';
import {Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {SERVER_URL} from '../config';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';
import TutorSearchRow from '../components/TutorSearchRow';

function MyTutorsView() {
  const [currTutors, setCurrTutors] = useState([]);
  const [pastTutors, setPastTutors] = useState([]);

  const {user} = useCurrentUser();

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
    }

    if (user != null) {
      fetchTutors();
    }
  }, [user]);

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>My Tutors</h3>
      <Card>
        {currTutors.map(currTutor => (
          <TutorSearchRow
            key={currTutor._id}
            tutor={currTutor}
          ></TutorSearchRow>
        ))}
        {pastTutors.map(pastTutor => (
          <TutorSearchRow
            key={pastTutor._id}
            tutor={pastTutor}
          ></TutorSearchRow>
        ))}
      </Card>
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

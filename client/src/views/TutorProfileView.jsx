import * as React from 'react';
import {Card} from 'react-bootstrap';
import {useLocation, withRouter} from 'react-router-dom';
import {useCurrentUser} from '../context/UserContext';
import CourseTokenizer from '../components/CourseTokenizer';

function TutorProfileView() {
  const location = useLocation();
  const {user} = useCurrentUser();
  const {tutor} = location.state;

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>
        {user && user._id === tutor._id ? 'My' : `${tutor.name}'s`} Profile
      </h3>
      <Card>
        <Card.Body>
          <Card.Title>Basic Information</Card.Title>
          <b>Email</b>
          <br />
          {tutor.email}
          <br />
          <p style={styles.subtitle}>
            <b>Bachelor</b>
          </p>
          {tutor.bachelor.name} ({tutor.bachelor.shortName})
          <br />
          <p style={styles.subtitle}>
            <b>Courses</b>
          </p>
          <div style={styles.tokenizerContainer}>
            <CourseTokenizer tokens={tutor.courses} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    flex: 1,
    padding: '10px',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontWeight: 200,
  },
  subtitle: {
    margin: 0,
    marginTop: '10px',
  },
  tokenizerContainer: {
    marginTop: '8px',
  },
};

export default withRouter(TutorProfileView);

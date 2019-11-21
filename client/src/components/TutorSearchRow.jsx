import * as React from 'react';
import {Badge, Card} from 'react-bootstrap';
import {FaStar} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import CourseTokenizer from './CourseTokenizer';

function TutorSearchRow({tutor}) {
  return (
    <Card style={styles.root}>
      <Card.Body>
        <Card.Subtitle style={styles.subtitle}>
          <Link
            to={{
              pathname: '/home/profile',
              state: {tutor},
            }}
          >
            {tutor.name}
          </Link>
          <Badge style={{marginLeft: '8px'}} variant="secondary">
            {tutor.bachelor.shortName}
          </Badge>
        </Card.Subtitle>
        Rating: {tutor.rating} / 5 ({tutor.ratingCount} reviews)
        <br />
        Courses
        <div style={styles.tokenizerContainer}>
          <CourseTokenizer
            tokens={tutor.courses}
            allowDelete={false}
            showBody={false}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

const styles = {
  root: {
    marginBottom: '10px',
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tokenizerContainer: {
    marginTop: '4px',
  },
};

export default TutorSearchRow;

import * as React from 'react';
import {Button, Badge, Card} from 'react-bootstrap';
import {FaStar} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import CourseTokenizer from './CourseTokenizer';

function MyTutorRow({tutor, start, end, onFinishClick, onCancelClick, isDone}) {
  const startTime = new Date(start).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const endTime = new Date(end).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const day = new Date(start).toLocaleString().split(',')[0];

  return (
    <Card style={styles.root}>
      <Card.Header>
        {day} ({startTime} - {endTime})
      </Card.Header>
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
      {!isDone && (
        <Card.Footer>
          <Button variant="success" onClick={onFinishClick}>
            Finish
          </Button>
          <Button
            style={{marginLeft: '10px'}}
            variant="danger"
            onClick={onCancelClick}
          >
            Cancel
          </Button>
        </Card.Footer>
      )}
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

export default MyTutorRow;

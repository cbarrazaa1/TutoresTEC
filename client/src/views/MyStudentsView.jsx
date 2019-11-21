import * as React from 'react';
import {Badge, Card, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {SERVER_URL} from '../config';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';

function MyStudentsView() {
  const [currStudents, setCurrStudents] = useState([]);
  const {user} = useCurrentUser();

  useEffect(() => {
    async function fetchStudents() {
      const url = `${SERVER_URL}/api/users/myStudents?id=${user._id}`;
      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      setCurrStudents(json.current);
    }

    if (user != null) {
      fetchStudents();
    }
  }, [user]);

  const onCancelClick = async session => {
    const conf = window.confirm(
      'Are you sure you want to cancel this session?',
    );
    if (conf) {
      const response = await fetch(`${SERVER_URL}/api/sessions/cancelByTutor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionID: session._id,
          tutorID: user._id,
          studentID: session.student._id,
        }),
      });

      setCurrStudents(prev => prev.filter(curr => curr._id !== session._id));
    }
  };

  return (
    <div>
      <div style={styles.root}>
        <h3 style={styles.title}>My Students</h3>
        {currStudents.length > 0 ? (
          <h5 style={{marginTop: '12px'}}>Scheduled Sessions</h5>
        ) : (
          <Card>
            <Card.Body>
              <h5>You have no students yet!</h5>
            </Card.Body>
          </Card>
        )}
        {currStudents.map(currStudent => {
          const startTime = new Date(currStudent.start).toLocaleString(
            'en-US',
            {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            },
          );
          const endTime = new Date(currStudent.end).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
          const day = new Date(currStudent.start)
            .toLocaleString()
            .split(',')[0];
          return (
            <Card style={{marginBottom: '10px'}}>
              <Card.Header>
                {day} ({startTime} - {endTime})
              </Card.Header>
              <Card.Body>
                <b>Student Name</b>
                <br />
                {currStudent.student.name}
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="danger"
                  onClick={() => onCancelClick(currStudent)}
                >
                  Cancel
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
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

export default withRouter(MyStudentsView);

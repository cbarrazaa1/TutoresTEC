import * as React from 'react';
import {Badge, Card} from 'react-bootstrap';
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

  return (
    <div>
      <div style={styles.root}>
        <h3 style={styles.title}>My Students</h3>
        {currStudents.length > 0 ? (
          <h5 style={{marginTop: '12px'}}>Current Students</h5>
        ) : null}
        {currStudents.map(currStudent => {
          return (
            <Card>
              <Card.Body>
                <Card.Subtitle>{currStudent.student.name}</Card.Subtitle>
              </Card.Body>
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

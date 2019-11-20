import * as React from 'react';
import {Card} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {SERVER_URL} from '../config';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';

function MyStudentsView() {
  const [currStudents, setCurrStudents] = useState([]);
  const {user} = useCurrentUser();

  useEffect(() => {
    async function fetchStudents() {
      const url = `${SERVER_URL}/api/users/myStudents?${user._id}`;
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

  return <div></div>;
}

export default withRouter(MyStudentsView);

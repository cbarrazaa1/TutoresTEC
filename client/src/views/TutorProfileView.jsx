import * as React from 'react';
import {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {useLocation, withRouter} from 'react-router-dom';
import {useCurrentUser} from '../context/UserContext';
import CourseTokenizer from '../components/CourseTokenizer';
import moment from 'moment';
import {Calendar, Views} from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizers/moment';

const momentLocalizer = localizer(moment);

function TutorProfileView() {
  const location = useLocation();
  const {user} = useCurrentUser();
  const [isSelf, setIsSelf] = useState(false);
  const [sessions, setSessions] = useState([]);
  const {tutor} = location.state;

  useEffect(() => {
    if (user != null) {
      setIsSelf(user._id === tutor._id);
      setSessions(
        tutor.sessions.filter(session => {
          if (!isSelf) {
            return session.tutor._id === tutor._id;
          }
          return session.tutor._id === user._id;
        }),
      );
    }
  }, [user]);

  const removeClosed = session => {
    return session.status !== 'closed';
  };

  const keepOpen = session => {
    return session.status === 'open';
  };

  const convertToEvent = session => {
    let title = 'Free Block';
    if (session.status === 'ongoing') {
      title = session.student.name;
    }

    session.start = new Date(session.start);
    session.end = new Date(session.end);
    return {...session, title, allDay: false, resource: null};
  };

  const onSelectEvent = async event => {
    const start = event.start.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    if (isSelf) {
      //new Date().
    } else {
      const conf = window.confirm(`Setup session at ${start}`);
    }
  };

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>{isSelf ? 'My' : `${tutor.name}'s`} Profile</h3>
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
          <p style={styles.subtitle}>
            <b>Tutor Rating</b>
          </p>
          {tutor.rating} / 5 ({tutor.ratingCount} reviews)
          <hr />
          <Card.Title>Schedule</Card.Title>
          {!isSelf &&
            'Pick a time from below to setup a session with this tutor.'}
          <Calendar
            style={styles.calendar}
            localizer={momentLocalizer}
            selectable={isSelf}
            events={
              isSelf
                ? (sessions || []).filter(removeClosed).map(convertToEvent)
                : (sessions || []).filter(keepOpen).map(convertToEvent)
            }
            defaultView={Views.WEEK}
            onSelectEvent={onSelectEvent}
            views={['week']}
            min={new Date(2017, 10, 0, 8, 0, 0)}
            max={new Date(2017, 10, 0, 23, 0, 0)}
          />
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
  calendar: {
    height: '700px',
    marginTop: '12px',
  },
};

export default withRouter(TutorProfileView);

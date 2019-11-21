import * as React from 'react';
import {useState, useEffect} from 'react';
import {Button, Form, Card, Modal} from 'react-bootstrap';
import {useLocation, withRouter} from 'react-router-dom';
import {useCurrentUser} from '../context/UserContext';
import CourseTokenizer from '../components/CourseTokenizer';
import moment from 'moment';
import {Calendar, Views} from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizers/moment';
import {SERVER_URL} from '../config';

const momentLocalizer = localizer(moment);

function TutorProfileView() {
  const location = useLocation();
  const {user} = useCurrentUser();
  const [isSelf, setIsSelf] = useState(false);
  const [sessions, setSessions] = useState([]);
  const tutorID = location.state.tutor._id;
  const [tutor, setTutor] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('BiblioTEC 2nd Floor');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchTutor() {
      const response = await fetch(
        `${SERVER_URL}/api/users/single?id=${tutorID}`,
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      setTutor(json.user);
      console.log(json);
    }

    fetchTutor();
  }, []);

  useEffect(() => {
    if (user != null && tutor != null) {
      setIsSelf(user._id === tutorID);
      setSessions(
        tutor.sessions.filter(session => {
          if (!isSelf) {
            return session.tutor._id === tutorID;
          }
          return session.tutor._id === user._id;
        }),
      );
    }
  }, [user, tutor]);

  const removeClosed = session => {
    return session.status !== 'closed';
  };

  const keepOpen = session => {
    return session.status === 'open';
  };

  const convertToEvent = session => {
    let title = session.place;
    if (session.status === 'pending') {
      title = `${session.place} - ${session.student.name} (occupied)`;
    } else {
      if (isSelf) {
        title += ' (open)';
      }
    }

    session.start = new Date(session.start);
    session.end = new Date(session.end);
    return {...session, title, allDay: false, resource: null};
  };

  const onCreateEvent = ({start, end}) => {
    for (let date of sessions) {
      if (
        (start > date.start && start < date.end) ||
        (date.start >= start && date.start <= end)
      ) {
        return;
      }
    }

    setSelectedStart(start);
    setSelectedEnd(end);
    setShowModal(true);
  };

  const onChangeLocation = e => {
    setSelectedPlace(e.target.value);
  };

  const onModalConfirm = async () => {
    setSessions(prev =>
      prev.concat({
        start: selectedStart,
        end: selectedEnd,
        title: selectedPlace,
        tutor: user._id,
        student: null,
        status: 'open',
        place: selectedPlace,
      }),
    );

    const response = await fetch(`${SERVER_URL}/api/users/createSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user._id,
        session: {
          start: selectedStart,
          end: selectedEnd,
          place: selectedPlace,
          status: 'open',
          tutor: user._id,
          student: null,
        },
      }),
    });
    onModalClose();
  };

  const onModalClose = () => {
    setSelectedPlace('BiblioTEC 2nd Floor');
    setSelectedStart(null);
    setSelectedEnd(null);
    setShowModal(false);
  };

  const modal = (
    <Modal show={showModal}>
      <Modal.Header>
        <Modal.Title>Choose Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Choose one of the available locations inside Campus Monterrey.
        <Form.Control
          style={{marginTop: '10px'}}
          as="select"
          onChange={onChangeLocation}
        >
          <option>BiblioTEC 2nd Floor</option>
          <option>BiblioTEC 3rd Floor</option>
          <option>BiblioTEC 4th Floor</option>
          <option>BiblioTEC 5th Floor</option>
          <option>BiblioTEC 6th Floor</option>
          <option>CETEC 1st Floor</option>
          <option>Innovaction Gym</option>
        </Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onModalConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const onSelectEvent = async event => {
    const start = event.start.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const end = event.end.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const day = event.start.toLocaleString().split(',')[0];

    if (isSelf) {
      if (event.status === 'open') {
        const conf = window.confirm(
          `Delete this event? (${day} ${start} - ${end} at ${event.place})`,
        );
        if (conf) {
          const response = await fetch(
            `${SERVER_URL}/api/users/deleteSession`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: user._id,
                sessionID: event._id,
              }),
            },
          );

          const json = await response.json();
          if (json.success) {
            setSessions(prev =>
              prev.filter(session => session._id !== event._id),
            );
          }
        }
      }
    } else {
      const conf = window.confirm(
        `Setup session for ${day} ${start} - ${end} at ${event.place}?`,
      );

      if (conf) {
        const response = await fetch(
          `${SERVER_URL}/api/sessions/edit/${event._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              student: user._id,
              status: 'pending',
            }),
          },
        );

        const json = await response.json();
        if (json.success) {
          setSessions(prev =>
            prev.filter(session => session._id !== event._id),
          );
        }
      }
    }
  };

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>
        {isSelf ? 'My' : `${tutor && tutor.name}'s`} Profile
      </h3>
      <Card>
        <Card.Body>
          <Card.Title>Basic Information</Card.Title>
          <b>Email</b>
          <br />
          {tutor && tutor.email}
          <br />
          <p style={styles.subtitle}>
            <b>Bachelor</b>
          </p>
          {tutor && tutor.bachelor.name} ({tutor && tutor.bachelor.shortName})
          <br />
          <p style={styles.subtitle}>
            <b>Courses</b>
          </p>
          <div style={styles.tokenizerContainer}>
            <CourseTokenizer tokens={(tutor && tutor.courses) || []} />
          </div>
          <p style={styles.subtitle}>
            <b>Tutor Rating</b>
          </p>
          {tutor && tutor.rating} / 5 ({tutor && tutor.ratingCount} reviews)
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
            onSelectSlot={onCreateEvent}
            onSelectEvent={onSelectEvent}
            views={['week']}
            min={new Date(2017, 10, 0, 8, 0, 0)}
            max={new Date(2017, 10, 0, 23, 0, 0)}
          />
        </Card.Body>
      </Card>
      {modal}
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

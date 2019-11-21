import * as React from 'react';
import {Button, Card, Form, InputGroup, Modal} from 'react-bootstrap';
import CourseTokenizer from '../components/CourseTokenizer';
import {useEffect, useState, useRef, useContext} from 'react';
import localizer from 'react-big-calendar/lib/localizers/moment';
import {Calendar, Views} from 'react-big-calendar';
import moment from 'moment';
import {useCurrentUser} from '../context/UserContext';
import {SERVER_URL} from '../config';

const momentLocalizer = localizer(moment);

function BecomeTutorView() {
  const [selectedBachelor, setSelectedBachelor] = useState({});
  const [bachelors, setBachelors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('BiblioTEC 2nd Floor');
  const [showModal, setShowModal] = useState(false);
  const courseCombobox = useRef(null);
  const {user} = useCurrentUser();

  useEffect(() => {
    async function fetchBachelors() {
      let response = await fetch(`${SERVER_URL}/api/bachelors/all`, {
        method: 'GET',
      });

      let json = await response.json();
      setBachelors(json.bachelors);
      setSelectedBachelor(json.bachelors[0]);

      // fetch related courses
      const bachelorName = json.bachelors[0].name;
      response = await fetch(
        `${SERVER_URL}/api/courses/all?bachelor=${bachelorName}`,
        {
          method: 'GET',
        },
      );
      json = await response.json();
      setCourses(json.courses);
    }

    fetchBachelors();
  }, []);

  const onSelectBachelor = async bachelor => {
    setSelectedBachelor(bachelor);
    const response = await fetch(
      `${SERVER_URL}/api/courses/all?bachelor=${bachelor.name}`,
      {
        method: 'GET',
      },
    );
    const json = await response.json();
    setCourses(json.courses);
  };

  const onSelectCourse = e => {
    const selectedCourse = courses[e.target.value];
    console.log(selectedCourse);
    setCourses(prev =>
      prev.filter(course => course._id !== selectedCourse._id),
    );
    setSelectedCourses(prev => prev.concat(selectedCourse));
    courseCombobox.current.value = 'Select course...';
  };

  const onTokenDelete = token => {
    setCourses(prev => prev.concat(token));
    setSelectedCourses(prev => prev.filter(course => course !== token));
  };

  const onCreateEvent = ({start, end}) => {
    for (let date of selectedDates) {
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

  const onSelectEvent = ({start, end}) => {
    setSelectedDates(prev =>
      prev.filter(date => start !== date.start && end !== date.end),
    );
  };

  const onConfirmClick = async () => {
    const response = await fetch(`${SERVER_URL}/api/users/becometutor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: user._id,
        courseIDs: selectedCourses.map(course => course._id),
        sessions: selectedDates,
      }),
    });

    const json = await response.json();
  };

  const onChangeLocation = e => {
    setSelectedPlace(e.target.value);
  };

  const onModalConfirm = () => {
    setSelectedDates(prev =>
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

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>Become A Tutor</h3>
      <Card>
        <Card.Body>
          Do you feel confident in a specific set of courses? Would you like to
          share what you know and help others that are in need? Become a
          TutoresTEC tutor! It's free!
          <br />
          <br />
          Becoming a tutor will facilitate other users to find you and ask for
          help via TutoresTEC. All you need to do is tell us for which courses
          you'd like to become a tutor and a schedule for when you're available
          for tutoring sessions.
          <hr />
          <Card.Title>Courses</Card.Title>
          Pick the courses you'd like to offer tutorings for.
          <Form style={styles.form}>
            <Form.Group>
              <Form.Label style={styles.formTitle}>Bachelor</Form.Label>
              <Form.Control
                style={styles.combobox}
                as="select"
                onChange={onSelectBachelor}
              >
                {bachelors.map((bachelor, i) => (
                  <option
                    key={bachelor._id}
                    value={i}
                  >{`${bachelor.name} (${bachelor.shortName})`}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                ref={courseCombobox}
                style={styles.combobox}
                as="select"
                onChange={onSelectCourse}
              >
                <option>Select course...</option>
                {courses.map((course, i) => (
                  <option key={course._id} value={i}>
                    {course.code}: {course.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <CourseTokenizer
              tokens={selectedCourses}
              onDeletePress={onTokenDelete}
            />
          </Form>
          <hr />
          <Card.Title>Schedule</Card.Title>
          Pick times in which you are available to offer tutoring sessions. You
          can change it later.
          <Calendar
            style={styles.calendar}
            selectable={true}
            localizer={momentLocalizer}
            events={selectedDates}
            defaultView={Views.WEEK}
            onSelectSlot={onCreateEvent}
            onSelectEvent={onSelectEvent}
            views={['week']}
          />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <br />
            Upon clicking confirm, you'll have a tutor profile and will appear
            in the search list!
            <Button style={styles.confirmButton} onClick={onConfirmClick}>
              Confirm
            </Button>
          </div>
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
  },
  title: {
    fontWeight: 200,
  },
  combobox: {
    width: '50%',
  },
  form: {
    marginTop: '8px',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  calendar: {
    height: '500px',
    marginTop: '12px',
  },
  confirmButton: {
    marginTop: '8px',
    width: '20%',
  },
};

export default BecomeTutorView;

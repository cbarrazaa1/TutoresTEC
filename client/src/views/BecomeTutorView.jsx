import * as React from 'react';
import {Card, Form, InputGroup} from 'react-bootstrap';
import CourseTokenizer from '../components/CourseTokenizer';
import {useState, useRef} from 'react';
import localizer from 'react-big-calendar/lib/localizers/moment';
import {Calendar, Views} from 'react-big-calendar';
import moment from 'moment';

const momentLocalizer = localizer(moment);

function BecomeTutorView() {
  const [courses, setCourses] = useState([
    'TC1020: Programming Fundamentals',
    'TC1030: Data Structures',
    'TC1010: Software Engineering Fundamentals',
  ]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const courseCombobox = useRef(null);

  const onBachelorChange = () => {};
  const onCourseChange = e => {
    const selected = e.target.value;
    if (selected === 'Select course...') {
      return;
    }

    setCourses(prev => prev.filter(course => course !== selected));
    setSelectedCourses(prev => prev.concat(selected));
    courseCombobox.current.value = 'Select course...';
  };

  const onTokenDelete = token => {
    setCourses(prev => prev.concat(token));
    setSelectedCourses(prev => prev.filter(course => course !== token));
  };

  const onCreateEvent = ({start, end}) => {
    setSelectedDates(prev => prev.concat({start, end}));
  };

  const onSelectEvent = () => {};

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
                onChange={onBachelorChange}
              >
                <option>Ingeniería en Tecnologías Computacionales (ITC)</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                ref={courseCombobox}
                style={styles.combobox}
                as="select"
                onChange={onCourseChange}
              >
                <option>Select course...</option>
                {courses.map(course => (
                  <option>{course}</option>
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
          Pick times in which you are available to offer tutoring sessions.
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
    height: '600px',
    marginTop: '12px',
  },
};

export default BecomeTutorView;

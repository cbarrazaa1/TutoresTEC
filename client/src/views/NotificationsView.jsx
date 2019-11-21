import * as React from 'react';
import Notification from '../components/Notification';
import {useCurrentUser} from '../context/UserContext';
import {withRouter} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';

function NotificationsView() {
  const {user} = useCurrentUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user != null) {
      setNotifications(user.notifications);
    }
  }, [user]);

  return (
    <div style={styles.root}>
      <h3 style={styles.title}>Notifications</h3>
      <div style={styles.container}>
        {notifications.length > 0 ? (
          notifications.map((notification, i) => {
            return (
              <Notification
                key={notification._id}
                text={notification.message}
                time={notification.receivedTime}
                hasBottomBorder={i === notifications.length - 1}
              />
            );
          })
        ) : (
          <Card>
            <Card.Body>
              <h5>You have no notifications!</h5>
            </Card.Body>
          </Card>
        )}
      </div>
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
  container: {
    width: '100%',
    height: '100%',
  },
};

export default withRouter(NotificationsView);

import * as React from 'react';
import Notification from '../components/Notification';

function NotificationsView() {
  return (
    <div style={styles.root}>
      <h3 style={styles.title}>Notifications</h3>
      <div style={styles.container}>
        <Notification
          text="You received a message from @isabelcruz!"
          time="3 days ago"
          hasBottomBorder={false}
        />
        <Notification
          text="@isabelcruz scheduled a tutoring session with you."
          time="4 days ago"
          hasBottomBorder={true}
        />
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

export default NotificationsView;

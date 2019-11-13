import * as React from 'react';

function Notification({text, hasBottomBorder, time}) {
  return (
    <div style={{...styles.root, borderBottom: hasBottomBorder ? '0.5px #dbdbdb solid' : 'none'}}>
      <p style={styles.text}>{text}</p>
      <p style={styles.time}>{time}</p>
    </div>
  );
}

const styles = {
  root: {
    width: '100%',
    height: '64px',
    borderTop: '0.5px #dbdbdb solid',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    padding: 0,
    margin: 0,
  },
  time: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    color: 'gray',
  },
};

export default Notification;

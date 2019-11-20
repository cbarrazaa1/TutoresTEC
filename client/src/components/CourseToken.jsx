import * as React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';

function CourseToken({text, allowDelete, onDeletePress}) {
  return (
    <div style={styles.token}>
      {text}
      {allowDelete && (
        <IoIosCloseCircleOutline
          onClick={onDeletePress}
          style={styles.closeIcon}
          size={16}
        />
      )}
    </div>
  );
}

const styles = {
  token: {
    backgroundColor: '#007bff',
    color: '#FFFFFF',
    marginRight: '6px',
    marginBottom: '6px',
    padding: '6px 10px 6px 10px',
    borderRadius: '10px',
    fontSize: 14,
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.20)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    marginLeft: '8px',
  },
};

export default CourseToken;

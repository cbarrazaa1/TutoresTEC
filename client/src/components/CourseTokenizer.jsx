import * as React from 'react';
import {Card} from 'react-bootstrap';
import {useState} from 'react';
import CourseToken from './CourseToken';

function CourseTokenizer({tokens, allowDelete, onDeletePress, showBody}) {
  const content = (
    <div style={styles.tokenContainer}>
      {tokens.length === 0
        ? 'No selected courses'
        : tokens.map(token => (
            <CourseToken
              key={token._id}
              text={token.name}
              allowDelete={allowDelete}
              onDeletePress={() => onDeletePress(token)}
            />
          ))}
    </div>
  );

  return showBody ? (
    <Card>
      <Card.Body>{content}</Card.Body>
    </Card>
  ) : (
    content
  );
}

const styles = {
  tokenContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default CourseTokenizer;

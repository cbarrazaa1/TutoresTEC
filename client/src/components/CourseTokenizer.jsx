import * as React from 'react';
import {Card} from 'react-bootstrap';
import {useState} from 'react';
import CourseToken from './CourseToken';

function CourseTokenizer({tokens, onDeletePress}) {
  return (
    <Card>
      <Card.Body>
        <div style={styles.tokenContainer}>
          {tokens.length === 0
            ? 'No selected courses'
            : tokens.map(token => (
                <CourseToken
                  key={token._id}
                  text={token.name}
                  allowDelete={true}
                  onDeletePress={() => onDeletePress(token)}
                />
              ))}
        </div>
      </Card.Body>
    </Card>
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

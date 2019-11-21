import * as React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Post({title, author, description}) {
  return (
    <Card style={{marginBottom: '10px'}}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle style={styles.card}>
          Posted by <Link>@{author}</Link>
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

const styles = {
  card: {
    marginBottom: '12px',
  },
};
export default Post;

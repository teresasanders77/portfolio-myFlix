import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Card.Text>Movie example(s): {genre.Movies}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
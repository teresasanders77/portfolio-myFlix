import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container>
          <Card style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Birth year: {director.Birth}</Card.Text>
              <Card.Text>Death year: {director.Death}</Card.Text>
              <Card.Text>Movie Example(s): {director.Movies}</Card.Text>
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
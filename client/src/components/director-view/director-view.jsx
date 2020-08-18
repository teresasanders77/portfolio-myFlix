import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>Bio: {director.Bio}</Card.Text>
          <Card.Text>Birth Year: {director.Birth}</Card.Text>
          <Card.Text>Death Year: {director.Death}</Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
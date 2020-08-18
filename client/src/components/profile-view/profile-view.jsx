import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, user } = this.props;

    if (!user) return null;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title>{user.Name}</Card.Title>
          <Card.Text>Name: {user.Name}</Card.Text>
          <Link to={`/`}>
            <Button variant="link">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-card">
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text><strong>Description: </strong>{movie.Description}</Card.Text>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button
                type='button'
                color="blue"
                rounded="true">Genre
          </Button>
            </Link>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button
                type='button'
                color="blue"
                rounded="true">Director
          </Button>
            </Link>
            <Link to={`/`}>
              <Button variant="link">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
  }),
  previous: PropTypes.string,
};

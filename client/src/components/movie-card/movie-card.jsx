import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-cards">
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <div className="card-text">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
            </div>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func
};
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, previous } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <div className="movie-view">
          <div class="d-flex justify-content-center">
            <img className="movie-poster" src={movie.ImagePath} width={300} height={550} mode='fit' />
          </div>
          <Row>
            <div className="movie-title">
              <strong className="label">Title: </strong>
              <span className="value">{movie.Title}</span>
            </div>
          </Row>
          <Row>
            <div className="movie-description">
              <strong className="label">Description: </strong>
              <span className="value">{movie.Description}</span>
            </div>
          </Row>
          <Row>
            <div className="movie-genre">
              <strong className="label">Genre: </strong>
              <span className="value">{movie.Genre.Name}</span>
            </div>
          </Row>
          <Row>
            <div className="movie-director">
              <strong className="label">Director: </strong>
              <span className="value">{movie.Director.Name}</span>
            </div>
          </Row>
          <div class="d-flex justify-content-center">
            <Row>
              <Button className="back-button" onClick={() =>
                previous(movie)} variant="light">Back</Button>
            </Row>
          </div>
        </div>
      </Container >
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

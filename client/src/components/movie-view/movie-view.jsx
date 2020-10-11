import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './movie-view.scss';
import axios from 'axios';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  /**
* Adds movie to list of favorites 
* @function addToFavorites
* @param {event} 
* @returns {alert} - added/not added to favorites 
*/
  addToFavorites(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios.post(
      `https://my-flix-77.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`,
      { username: localStorage.getItem('user') },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        alert(`${movie.Title} was successfully added to your favorites`);
      })
      .then(res => {
        document.location.reload(true);
      })
      .catch(error => {
        alert(`${movie.Title} not added to your favorites` + error)
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-card">
        <Card style={{ width: '20rem' }}>
          <Button className="add-favorite-btn mt-4" onClick={e => this.addToFavorites(e)}>
            <span>
              Add to favorites
            </span>
          </Button>
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

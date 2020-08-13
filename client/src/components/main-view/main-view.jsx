import React from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://my-flix-77.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
    if (!user) return [
      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />,
      <RegistrationView onLoggedIn={(user) => this.onLoggedIn(user)} />
    ];

    if (!movies) return <div className="main-view" />;

    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <div className="main-view">
            {selectedMovie ? (
              <MovieView movie={selectedMovie} previous={movie =>
                this.onMovieClick(!movie)} />
            ) : (
                movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                ))
              )}
          </div>
        </div>
      </Container>
    );
  }
}

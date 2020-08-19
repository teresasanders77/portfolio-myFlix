import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false,
    };
  }

  getMovies(token) {
    axios.get('https://my-flix-77.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }


  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return (
        <LoginView
          onClick={() => this.onRegistered()}
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">myFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/user">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Button size="sm" onClick={() => this.onLoggedOut()}>
            <b>Log Out</b>
          </Button>
        </div>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return (
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            );
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }}
          />
          <Route path="/users" component={ProfileView} />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }}
          />
          <Route exact path="/user" render={() => <ProfileView movies={movies} />}
          />
          <Route path="/user/update" render={() => <UpdateProfile />} />
        </div>
      </Router>
    );
  }
}


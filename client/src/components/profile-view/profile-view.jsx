import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';
import { connect } from 'mongoose';


const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favorites: [],
      usernameForm: null,
      passwordForm: null,
      emailForm: null,
      birthdayForm: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    let userEndpoint = 'https://my-flix-77.herokuapp.com/users/';
    let url = `${userEndpoint}${username}`;

    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favorites: response.data.Favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser(event) {
    event.preventDefault();
    let userEndpoint = 'https://my-flix-77.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}`;

    axios.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
      .then(response => {
        alert('Your account has been deleted!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/client', '_self');
      })

      .catch(event => {
        alert(event, 'failed to delete user');
      });
  }

  deleteMovie(event, favorites) {
    event.preventDefault();
    console.log(favorites);
    let userEndpoint = 'https://my-flix-77.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}/movies/${favorites}`;

    axios.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    )
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })

      .catch(event => {
        alert(event, 'Something went wrong...');
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let userEndpoint = 'https://my-flix-77.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let url = `${userEndpoint}${usernameLocal}`;

    axios.put(url, {
      Username: this.state.usernameForm,
      Password: this.state.passwordForm,
      Email: this.state.emailForm,
      Birthay: this.state.birthdayForm
    },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    )
      .then(response => {
        console.log(response);
        alert('Your data has been updated!');
        localStorage.setItem('user', this.state.usernameForm);
        this.getUser(localStorage.getItem('token'));
        document.getElementsByClassName('changeDataForm')[0];
      })
      .catch(event => {
        console.log(event, 'error updating the userdata');
        alert('Something went wrong!');
      });
  }

  toggleForm() {
    let form = document.getElementsByClassName('changeDataForm')[0];
    let toggleButton = document.getElementById('toggleButton');

    form.classList.toggle('show-form');
    if (form.classList.contains('show-form')) {
      toggleButton.innerHTML = 'Change data &uarr;';
    } else {
      toggleButton.innerHTML = 'Change data &darr;';
    }
  }

  render() {
    const { userData, username, email, birthday, favorites } = this.state;
    const { movies } = this.props;

    console.log('fv', favorites);
    console.log('log m', movies);

    let filteredFavMovie = [];
    let filterMoviesByFav = movies.map(m => {
      if (!favorites) return null;
      for (let i = 0; i < favorites.length; i++) {
        const favMov = favorites[i];
        if (m._id === favMov) {
          filteredFavMovie.push(m);
        }
      }
    });
    console.log(
      'TCL: ProfileView -> render -> filteredFavMovie',
      filteredFavMovie)

    if (!userData) return null;

    return (
      <Container fluid="md">
        <Row>
          <Col>
            <div className="info">
              {/* username */}
              <div className='username'>
                <h4 className='label'>Name:</h4>
                <div className='value'>{username}</div>
              </div>
              <br></br>

              {/* password */}
              <div className='password'>
                <h4 className='label'>Password:</h4>
                <div className='value'>********</div>
              </div>
              <br></br>

              {/* birthday */}
              <div className='birthday'>
                <h4 className='label'>Birthday:</h4>
                <div className='value'>{birthday}</div>
              </div>
              <br></br>

              {/* email */}
              <div className='email'>
                <h4 className='label'>Email:</h4>
                <div className='value'>{email}</div>
              </div>
              <br></br>

              {/* favoriteMovies */}
              <div className='favorites'>
                <h4 id='fav' className='label'>
                  Favorite Movies:
            </h4>

                {movies && filteredFavMovie ? (
                  <div className='value'>
                    {filteredFavMovie.map(favorites => (
                      <div key={favorites._id}>
                        {favorites.Title}
                        <button onClick={() => this.deleteMovie(event, favorites._id)}>Delete</button>
                      </div>
                    ))}
                  </div>
                ) : (
                    <div className='value'>Your Favorite Movie List is empty!</div>
                  )}
              </div>

              <Link to={'/'}>
                <Button className='view-btn' variant='dark' type='button'>
                  Go to Movies
          </Button>
              </Link>
            </div>
          </Col>

          <Col>
            <Form className='changeDataForm'>
              <h2>Update Information</h2>
              <hr></hr>
              <Form.Group controlId='formBasicUsername'>
                <Form.Label>Your Username</Form.Label>
                <Form.Control
                  type='text'
                  name='usernameForm'
                  onChange={event => this.handleChange(event)}
                  placeholder='Enter Username'
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Your Password</Form.Label>
                <Form.Control
                  type='text'
                  name='passwordForm'
                  onChange={event => this.handleChange(event)}
                  placeholder='Enter Password'
                />
              </Form.Group>

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type='text'
                  name='emailForm'
                  onChange={event => this.handleChange(event)}
                  placeholder='Enter Email'
                />
              </Form.Group>


              <Form.Group controlId='formBasicBirthday'>
                <Form.Label>Your Birthday</Form.Label>
                <Form.Control
                  type='text'
                  name='birthdayForm'
                  onChange={event => this.handleChange(event)}
                  placeholder='example: 1999/01/01'
                />
              </Form.Group>
              <div className="button-box col-lg-12">
                <Button className='change-btn'
                  variant='dark'
                  type='button'
                  onClick={event => this.handleSubmit(event)}>
                  Update Profile
          </Button>

                <Button className='view-btn'
                  variant='danger'
                  type='button'
                  onClick={event => this.deleteUser(event)}>
                  Delete Account
          </Button>
              </div>
            </Form>
          </Col>
        </Row >
      </Container >
    );
  }
}

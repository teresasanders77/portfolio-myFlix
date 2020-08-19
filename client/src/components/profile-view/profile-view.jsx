import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get('https://my-flix-77.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movies } = this.props;

    return (
      <div className="profile-view">
        <Container>
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username}</Card.Text>
              <Card.Text>Password: xxxxxx</Card.Text>
              <Card.Text>Email: {this.state.Email}</Card.Text>
              <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
              <Card.Text>Favorite Movies: {this.state.FavoriteMovies}</Card.Text>
              <Link to={'/user/update'}>
                <Button variant="primary">Update Profile</Button>
              </Link>
              <Button onClick={() => this.deleteUser()}>Delete User</Button>
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
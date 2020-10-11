import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
 * Login view
 * @function handleSubmit
 * @param {event} 
 * @returns {Container} - login form
 */

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://my-flix-77.herokuapp.com/login', null, {
      params: {
        Username: username,
        Password: password
      }
    })
      .then(response => {
        e.preventDefault();
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
        alert('Incorrect name or password');
      });
  };

  return (
    <Container className='logContainer'>
      <form>
        <Form.Group controlId='formBasicUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='Control'
            type='text'
            placeholder='Enter Username'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='Control'
            type='password'
            placeholder='Enter Password'
          />
        </Form.Group>
        <Button
          type='submit'
          color="blue"
          rounded="true"
          onClick={handleSubmit}>Login</Button>

        <Link to={`/register`}>
          <Button variant="link" className="registerButton" type="link">
            Not registered yet?
           </Button>
        </Link>
      </form>
    </Container>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};


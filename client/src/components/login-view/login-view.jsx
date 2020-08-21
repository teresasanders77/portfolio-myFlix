import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Swit } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
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
          type='button'
          color="blue"
          rounded="true"
          onClick={handleSubmit}>Login</Button>

        <Link to={`/register`}>
          <Button variant="link" className="registerButton" type="submit">
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


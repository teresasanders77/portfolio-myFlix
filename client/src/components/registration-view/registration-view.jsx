import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import './registration-view.scss';
import axios from 'axios';

/**
 * Registers new user 
 * @function RegistrationView
 * @param {props} username, password, email, birthday 
 * @returns {Container} - registration form
 */

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let userEndpoint = 'https://my-flix-77.herokuapp.com/users/';
    axios.post(userEndpoint, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        alert('Success!');
        console.log(data);
        window.open('/client', '_self');//will open in the same tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Container className='regContainer'>
      <Form className='registrationForm'>
        <Form.Group controlid='formBasicUsername'>
          < Form.Label>Username:</Form.Label>
          <Form.Control
            type='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>

        <Form.Group controlid='formBasicPassword'>
          < Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
        </Form.Group>

        <Form.Group controlid='formBasicEmail'>
          < Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
        </Form.Group>

        <Form.Group controlid='formBasicBirthday'>
          < Form.Label>Birthday:</Form.Label>
          <Form.Control
            type='birthday'
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            placeholder='Enter Birthday'
          />
        </Form.Group>

        <Button
          color="blue"
          type='submit'
          rounded="true"
          onClick={e => handleSubmit(e)}>Register</Button>

        <Link to={`/`}>
          <Button variant="link" className="Button">Already registered?</Button>
        </Link>
      </Form >
    </Container >
  );
}

RegistrationView.propTypes = {
  registration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
}


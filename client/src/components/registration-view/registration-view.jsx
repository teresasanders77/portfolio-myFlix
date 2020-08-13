import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Form>
        <h4>Register</h4>
        <Form.Group className='registration'>
          <Row>
            <Col md="6">
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={e => setUsername(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Username'
              />

              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Password'
              />

              <Form.Label className='Email'>Email:</Form.Label>
              <Form.Control
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Email Address'
              />

              <Form.Label className='Birthday'>Birthday:</Form.Label>
              <Form.Control
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Birthday'
              />
            </Col>
          </Row>
          <Row>
            <Col className='Button'>
              <Button
                type='button'
                color="blue"
                rounded="true"
                onClick={handleSubmit}>Register</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
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
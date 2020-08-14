import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://my-flix-77.herokuapp.com/login', {
      Username: username,
      Password: password
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
    <Container>
      <Form>
        <h4>Login</h4>
        <Form.Group className='login'>
          <Row>
            <Col md="6">
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Username'
              />
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='Control2'
                type='password'
                placeholder='Enter Password'
              />
            </Col>
          </Row>
          <Row>
            <Col className='Button'>
              <Button
                type='button'
                color="blue"
                rounded="true"
                onClick={handleSubmit}>Login</Button>
            </Col>
          </Row>
          <div className="d-flex flex-column">
            <footer className="footer">
              <div>
                <a href="">Not registered yet?</a>
              </div>
            </footer>
          </div>
        </Form.Group>
      </Form>
    </Container >
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
import React from 'react';
import { useState } from 'react';
import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginRequest, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const LoginIn = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const request = useSelector(getRequest);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    const usr = {
      login,
      password,
    };

    setStatus(true);
    dispatch(addLoginRequest(usr));

    setLogin('');
    setPassword('');
  };

  if (request.success) {
    setTimeout(() => {
      navigate('/');
      window.location.reload();
      setStatus(false);
    }, 3000);
  }

  return (
    <Form onSubmit={validate(handleSubmit)} className='col-md-8 mx-auto my-4'>
      <h1 className='my-4'>Login</h1>

      {request && request.pending && (
        <Progress animated color='primary' value={50} />
      )}
      {request && request.error && status && (
        <Alert color='danger'>{request.error}</Alert>
      )}
      {request && request.success && status && (
        <Row className='mb-3'>
          <Col className='col-10 align-self-center'>
            <Alert className='m-0' color='success'>
              You have been Successfully Logged in! Redirecting...
            </Alert>
          </Col>
          <Col className='col-2 align-self-center'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}

      <Form.Group className='mb-4 col-md-6' controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control
          {...register('login', { required: true })}
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder='Login'
        />
        {errors.login && (
          <small className='d-block form-text text-danger mt-2'>
            Login can't be empty.
          </small>
        )}
      </Form.Group>

      <Form.Group className='mb-4 col-md-6' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register('password', { required: true })}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {errors.password && (
          <small className='d-block form-text text-danger mt-2'>
            Password can't be empty.
          </small>
        )}
      </Form.Group>

      <Button variant='success' type='submit'>
        Login
      </Button>
    </Form>
  );
};

export default LoginIn;

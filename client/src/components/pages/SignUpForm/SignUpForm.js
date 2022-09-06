import React from 'react';
import { useState } from 'react';
import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addRegistrationRequest, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [telephone, setTelephone] = useState('');
  const [avatarError, setAvatarError] = useState(false);
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
    setAvatarError(!avatar);

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('avatar', avatar);
    fd.append('telephone', telephone);

    if (avatar) {
      setStatus(true);
      dispatch(addRegistrationRequest(fd));
      setAvatarError('');
      setLogin('');
      setPassword('');
      setAvatar('');
      setTelephone('');
    }
  };

  if (request.success) {
    setTimeout(() => {
      navigate('/');
      setStatus(false);
    }, 3000);
  }

  return (
    <Form
      onSubmit={validate(handleSubmit)}
      className='col-md-8 mx-auto my-4'
      encType='multipart/form-data'
    >
      <h1 className='my-4'>Sign Up</h1>

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
              You have been Successfully registered! Redirecting...
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

      <Form.Group className='mb-4 col-md-6' controlId='formAvatar'>
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type='file'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {avatarError && (
          <small className='d-block form-text text-danger mt-2'>
            Avatar is required.
          </small>
        )}
      </Form.Group>

      <Form.Group className='mb-4 col-md-6' controlId='formTelephone'>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          {...register('telephone', { required: true })}
          type='tel'
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder='Telephone'
        />
        {errors.password && (
          <small className='d-block form-text text-danger mt-2'>
            Telephone can't be empty.
          </small>
        )}
      </Form.Group>

      <Button variant='success' type='submit'>
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;

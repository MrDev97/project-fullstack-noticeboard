import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAdRequest } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [telephone, setTelephone] = useState('');
  const [avatarError, setAvatarError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    setAvatarError(!avatar);
    if (avatar) {
      dispatch(
        addAdRequest({
          login,
          password,
          avatar,
          telephone,
        })
      );
      navigate('/');
      setAvatarError('');
      setLogin('');
      setPassword('');
      setAvatar('');
      setTelephone('');
    }
  };

  return (
    <Form
      onSubmit={validate(handleSubmit)}
      className='col-md-8 mx-auto my-4'
      encType='multipart/form-data'
    >
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
        <Form.Control type='file' />
        {avatarError && (
          <small className='d-block form-text text-danger mt-2'>
            Avatar is required.
          </small>
        )}
      </Form.Group>

      <Form.Group className='mb-4 col-md-6' controlId='formTelephone'>
        <Form.Label>Telephone</Form.Label>
        <Form.Control
          {...register('telephone', { required: true })}
          type='text'
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

      <Button variant='primary' type='success'>
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;

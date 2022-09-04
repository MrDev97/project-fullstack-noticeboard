import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addRegistrationRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
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

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('avatar', avatar);
    fd.append('telephone', telephone);

    if (avatar) {
      dispatch(addRegistrationRequest(fd));
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
      <h1 className='my-4'>Sign Up</h1>

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

      <Button variant='primary' type='success'>
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;

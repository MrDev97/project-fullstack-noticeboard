import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loadSearchedAdsRequest } from '../../../redux/adsRedux';

const NavBar = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadSearchedAdsRequest(searchPhrase));
    navigate(`/ads/search/${searchPhrase}`);
    setSearchPhrase('');
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/' className='py-4 fs-3'>
          NoticeBoard.app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='justify-content-end text-center'
        >
          <Nav className='fs-4 me-3'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/auth/register'>
              Sign Up
            </Nav.Link>
            <Nav.Link as={NavLink} to='/auth/login'>
              Login
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSubmit} className='d-flex my-2'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2 my-2'
              aria-label='Search'
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <Button type='submit' className='align-self-center' variant='outline-success'>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

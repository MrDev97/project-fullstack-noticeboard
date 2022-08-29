import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch();
    setSearchPhrase('');
  };

  useEffect(() => {
    // dispatch();
  }, [dispatch]);

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
          </Nav>
          <Form onSubmit={handleSubmit} className='d-flex my-2 my-md-0'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <div className='col-md-8 mt-5 align-self-center'>
          <h1 className='m-0 fw-bold'>404 Not Found</h1>
          <div className='fs-3 my-4'>
            <p className='m-0'>Ooops!</p>
            <p className='my-2'>There seems to be nothing out here...</p>
          </div>
          <Link as={Button} to={'/'}>
            <Button className='btn-lg' variant='primary'>
              Take me Home
            </Button>
          </Link>
        </div>
      </Row>
    </Container>
  );
};

export default NotFound;

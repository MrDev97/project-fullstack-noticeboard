import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Ads from '../../features/Ads/Ads';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/ads/add');
  };

  return (
    <Container className='mt-4'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0 align-self-center'>All Adverts</h1>
        <Button variant='outline-primary' onClick={navigateHome}>
          Create New Advert
        </Button>
      </div>
      <Ads />
    </Container>
  );
};

export default Home;

import React from 'react';
import { Container } from 'react-bootstrap';
import Ads from '../../features/Ads/Ads';

const Home = () => {

  return (
    <Container className='mt-4'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0 align-self-center'>All Adverts</h1>
      </div>
      <Ads />
    </Container>
  );
};

export default Home;

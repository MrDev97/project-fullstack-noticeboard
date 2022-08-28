import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllAds, loadAdsRequest } from '../../../redux/adsRedux';
import Ads from '../../features/Ads/Ads';

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  return (
    <Container className='mt-4'>
      <div className='d-flex justify-content-between'>
        <h1 className='m-0 align-self-center'>All Adverts</h1>
      </div>
      <Ads ads={ads} />
    </Container>
  );
};

export default Home;

import React from 'react';
import { Row } from 'react-bootstrap';
import Ad from '../Ad/Ad';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAllAds } from '../../../redux/adsRedux';

const Search = () => {
  const ads = useSelector(getAllAds).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  if (!ads.length) return <Navigate to='/' />;
  return (
    <Row xs={1} md={2} lg={3} className='g-4 my-2'>
      {ads.map((ad) => (
        <Ad key={ad._id} {...ad} />
      ))}
    </Row>
  );
};

export default Search;

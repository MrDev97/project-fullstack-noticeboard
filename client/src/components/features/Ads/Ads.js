import React from 'react';
import { Row } from 'react-bootstrap';
import Ad from '../Ad/Ad';

const Ads = ({ ads }) => {
  return (
    <Row xs={1} md={2} lg={3} className='g-4 my-2'>
      {ads.map((ad) => (
        <Ad key={ad._id} {...ad} />
      ))}
    </Row>
  );
};

export default Ads;

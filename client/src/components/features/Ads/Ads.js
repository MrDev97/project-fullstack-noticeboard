import React from 'react';
import { Row } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import Ad from '../Ad/Ad';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllAds, loadAdsRequest, getRequest } from '../../../redux/adsRedux';

const Ads = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (request.pending) return <Progress animated color='primary' value={50} />;
  else if (request.error) return <Alert color='warning'>{request.error}</Alert>;
  else if (!request.success || !ads.length)
    return <Alert color='info'>No Adverts!</Alert>;
  else if (request.success)
    return (
      <Row xs={1} md={2} lg={3} className='g-4 my-2'>
        {ads.map((ad) => (
          <Ad key={ad._id} {...ad} />
        ))}
      </Row>
    );
};

export default Ads;

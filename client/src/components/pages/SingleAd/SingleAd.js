import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { Link, Navigate } from 'react-router-dom';
import DeleteAd from '../../features/DeleteAd/DeleteAd';
import { dateToString } from '../../../utils/dateToString';
import { IMGS_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';

const SingleAd = () => {
  const { adId } = useParams();
  const user = useSelector(getUser);
  const adData = useSelector((state) => getAdById(state, adId));

  if (!adData) return <Navigate to='/' />;
  return (
    <Container>
      <Card bg={'light'} className='mt-5 justify-content-center'>
        <Row className='flex-row-reverse'>
          <Col className='col-12 col-md-5 align-self-center'>
            <Card.Img
              variant='top'
              crossOrigin='anonymous'
              src={IMGS_URL + adData.image}
            />
          </Col>
          <Col className='col-12 col-md-7'>
            <Card.Body>
              <Card.Title className='fw-bold mb-3 fs-2'>
                {adData.title}
              </Card.Title>
              <Image
                className='rounded-circle mb-3'
                style={{ resizeMode: 'cover', maxHeight: 60, maxWidth: 60 }}
                crossOrigin='anonymous'
                src={IMGS_URL + adData.user.avatar}
              />
              <Card.Text className='mb-0'>
                <span className='fw-bold'>User: </span>
                {adData.user.login}
              </Card.Text>
              <Card.Text>
                <span className='fw-bold'>Tel: </span>
                {adData.user.telephone}
              </Card.Text>
              <Card.Text className='mb-0'>
                <span className='fw-bold'>Published: </span>
                {dateToString(new Date(adData.date))}
              </Card.Text>
              <Card.Text>
                <span className='fw-bold'>Location: </span>
                {adData.location}
              </Card.Text>
              <Card.Text className='my-3'>
                <span className='fw-bold'>Price: </span>
                {adData.price}$
              </Card.Text>
              <Card.Text className='my-3'>
                <span className='fw-bold'>Description: </span>
                <br />
                {adData.description}
              </Card.Text>
              {user && user.id === adData.user._id && (
                <div className='mt-3 d-flex justify-content-end align-items-start'>
                  <Link to={`/ads/edit/${adId}`}>
                    <Button className='m-2' variant='outline-info'>
                      Edit
                    </Button>
                  </Link>
                  <DeleteAd id={adData._id} />
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SingleAd;

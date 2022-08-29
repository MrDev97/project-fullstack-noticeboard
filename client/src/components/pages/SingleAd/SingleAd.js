import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { Link, Navigate } from 'react-router-dom';
// import DeleteAd from '../DeleteAd/DeleteAd';
import { dateToString } from '../../../utils/dateToString';
import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const SingleAd = () => {
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));

  if (!adData) return <Navigate to='/' />;
  return (
    <Container>
      <Card bg={'light'} className='mt-5 justify-content-center'>
        <Row className='flex-row-reverse'>
          <Col className='col-12 col-md-5 align-self-center'>
            <Card.Img variant='top' src={adData.image} />
          </Col>
          <Col className='col-12 col-md-7'>
            <Card.Body>
              <Card.Title className='fw-bold mb-3 fs-2'>
                {adData.title}
              </Card.Title>
              <Image className='roundedCircle mb-3' src={adData.user.avatar} />
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
              <Card.Text>
                <span className='fw-bold'>Description: </span>
                <br />
                {adData.description}
              </Card.Text>
              {/* <Link to={`/ads/edit/${adId}`}>
                  <Button className='m-2' variant='outline-info'>
                    Edit
                  </Button>
                </Link> */}
              {/* <DeleteAd id={adData.id} /> */}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SingleAd;

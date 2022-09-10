import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dateToString } from '../../../utils/dateToString';
import { IMGS_URL } from '../../../config';

const Ad = (props) => {
  return (
    <Col>
      <Card bg={'light'}>
        <Card.Img
          style={{ resizeMode: 'cover', minHeight: 400, maxHeight: 400 }}
          crossOrigin='anonymous'
          src={IMGS_URL + props.image}
        />
        <Card.Body>
          <Card.Title className='fw-bold mb-3 text-truncate'>
            {props.title}
          </Card.Title>
          <Card.Text className='mb-0'>
            <span className='fw-bold'>Published: </span>
            {dateToString(new Date(props.date))}
          </Card.Text>
          <Card.Text>
            <span className='fw-bold'>Location: </span>
            {props.location}
          </Card.Text>
          <Link to={`/ads/${props._id}`}>
            <Button variant='secondary'>Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Ad;

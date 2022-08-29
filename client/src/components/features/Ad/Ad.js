import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dateToString } from '../../../utils/dateToString';

const Ad = (props) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title className='fw-bold mb-3 text-truncate'>
            {props.title}
          </Card.Title>
          <Card.Text>
            <span className='fw-bold'>Image: </span>
            {props.image}
            <br />
            <span className='fw-bold'>Published: </span>
            {dateToString(new Date(props.date))}
            <br />
          </Card.Text>
          <Link to={`/ads/${props._id}`}>
            <Button variant='primary'>Read more</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Ad;

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { removeAdRequest } from '../../../redux/adsRedux';
import { Link, useNavigate } from 'react-router-dom';

const DeleteAd = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = () => {
    dispatch(removeAdRequest(props.id));
    setShow(false);
    navigate('/');
  };

  return (
    <>
      <Button
        className='my-2 mw-2'
        variant='outline-danger'
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are You sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This operation will completely remove this Advert from the app.
          <br />
          Are You sure You want to do that?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAd;

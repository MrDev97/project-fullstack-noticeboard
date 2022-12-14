import React from 'react';
import { useDispatch } from 'react-redux';
import { addAdRequest } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import AdForm from '../../pages/AdForm/AdForm';

const AddAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(addAdRequest(ad));
    navigate('/');
  };

  return <AdForm action={handleSubmit} actionText={'Add Advert'} />;
};

export default AddAd;

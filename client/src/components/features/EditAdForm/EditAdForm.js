import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getAdById } from '../../../redux/adsRedux';
import { editAdRequest } from '../../../redux/adsRedux';
import { useNavigate, Navigate } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';

const EditAdForm = () => {
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(editAdRequest(ad, adId));
    navigate('/');
  };

  if (!adData) return <Navigate to='/' />;
  return (
    <AdForm action={handleSubmit} actionText={'Edit Advert'} {...adData} />
  );
};

export default EditAdForm;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLogoutRequest, getUser } from '../../../redux/usersRedux';

const LogOut = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addLogoutRequest(user));
    navigate('/');
  }, [dispatch]);
};

export default LogOut;

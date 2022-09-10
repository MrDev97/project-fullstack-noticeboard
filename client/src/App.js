import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import MainLayout from './components/views/MainMenu/MainMenu';
import SingleAd from './components/pages/SingleAd/SingleAd.js';
import Search from './components/common/Search/Search';
import AddAd from './components/features/AddAd/AddAd.js';
import EditAd from './components/features/EditAd/EditAd.js';
import SignUp from './components/pages/SignUpForm/SignUpForm.js';
import LogIn from './components/pages/LogInForm/LogInForm.js';
import { useDispatch } from 'react-redux';
import { checkLoginRequest } from './redux/usersRedux';
import LogOut from './components/features/LogOut/LogOut.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginRequest());
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/ads/:adId' element={<SingleAd />} />
        <Route path='/ads/add' element={<AddAd />} />
        <Route exact path='/ads/edit/:adId' element={<EditAd />} />
        <Route path='/auth/login' element={<LogIn />} />
        <Route path='/auth/logout' element={<LogOut />} />
        <Route path='/auth/register' element={<SignUp />} />
        <Route path='/ads/search/:searchPhrase' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;

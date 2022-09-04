import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import MainLayout from './components/views/MainMenu/MainMenu';
import SingleAd from './components/pages/SingleAd/SingleAd.js';
import Search from './components/features/Search/Search';
import AddAdForm from './components/features/AddAdForm/AddAdForm.js';
import EditAdForm from './components/features/EditAdForm/EditAdForm.js';
import SignUp from './components/pages/SignUpForm/SignUpForm.js';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/ads/:adId' element={<SingleAd />} />
        <Route path='/ads/add' element={<AddAdForm />} />
        <Route exact path='/ads/edit/:adId' element={<EditAdForm />} />
        {/* <Route path='/auth/login' element={<SignIn />} /> */}
        <Route path='/auth/register' element={<SignUp />} />
        <Route path='/ads/search/:searchPhrase' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import MainLayout from './components/views/MainMenu/MainMenu';
import SingleAd from './components/pages/SingleAd/SingleAd.js';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/ads/:adId' element={<SingleAd />} />
        {/* <Route path='/ads/add' element={<AddAd />} /> */}
        {/* <Route exact path='/ads/edit/:id' element={<EditAd />} /> */}
        {/* <Route path='/auth/login' element={<SignIn />} /> */}
        {/* <Route path='/auth/register' element={<SignUp />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;

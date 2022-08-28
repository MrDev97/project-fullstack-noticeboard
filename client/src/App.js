import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/views/NavBar/NavBar';
import Home from './components/pages/Home/Home.js';
import NotFound from './components/pages/NotFound/NotFound.js';

const App = () => {
  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route exact path='/ads/:id' element={<SingleAd />} /> */}
          {/* <Route path='/ads/add' element={<AddAd />} /> */}
          {/* <Route exact path='/ads/edit/:id' element={<EditAd />} /> */}
          {/* <Route path='/auth/login' element={<SignIn />} /> */}
          {/* <Route path='/auth/register' element={<SignUp />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </main>
  );
};

export default App;

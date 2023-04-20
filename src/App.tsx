import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';
import { HomePage } from './Pages/HomePage';

export const App  = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HomePage></HomePage>
      <Footer></Footer>
    </div>
  );
}


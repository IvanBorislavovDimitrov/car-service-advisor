import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import ObligationList from './components/ObligationList';
import AddObligation from './components/AddObligation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cars" element={<CarList />} />
          <Route path="/add-car" element={<AddCar />} />

          <Route path="/obligations" element={<ObligationList />} />
          <Route path="/add-obligation" element={<AddObligation />} />

          <Route path="/about" element={<h2>ℹ️ About Page</h2>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

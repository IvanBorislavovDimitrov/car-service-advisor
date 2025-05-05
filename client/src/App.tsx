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

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/about" element={<h2>ℹ️ About Page</h2>} />
          <Route path="/add-car" element={<AddCar />} />

        </Routes>
      </div>
    </>
  );
}

export default App;

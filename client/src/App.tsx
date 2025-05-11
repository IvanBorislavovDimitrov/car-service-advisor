import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import ObligationList from './components/ObligationList';
import AddObligation from './components/AddObligation';

function App() {

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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../model/car';

const AddCar: React.FC = () => {
  const navigate = useNavigate();

  const [car, setCar] = useState<Car>(new Car(0, '', '', '', 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: name === 'mileage' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });

      if (!response.ok) throw new Error('Failed to add car');

      navigate('/');
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Could not add car');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            className="form-control"
            value={car.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input
            type="text"
            name="model"
            className="form-control"
            value={car.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">VIN</label>
          <input
            type="text"
            name="vin"
            className="form-control"
            value={car.vin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mileage</label>
          <input
            type="number"
            name="mileage"
            className="form-control"
            value={car.mileage}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
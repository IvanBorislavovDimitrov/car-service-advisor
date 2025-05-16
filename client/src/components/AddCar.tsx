import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car } from '../model/car';
import { CarOwner } from '../model/car-owner';

const AddCar: React.FC = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState<Car>(new Car(0, '', '', '', 0));
  const [owners, setOwners] = useState<CarOwner[]>([]);
  const [ownerId, setOwnerId] = useState<number | ''>('');
  const [loadingOwners, setLoadingOwners] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/cars/owners');
        if (!response.ok) throw new Error('Failed to fetch owners');
        const data = await response.json();
        setOwners(data);
        if (data.length > 0) setOwnerId(data[0].id);
      } catch (err) {
        setOwners([]);
      } finally {
        setLoadingOwners(false);
      }
    };
    fetchOwners();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'ownerId') {
      setOwnerId(Number(value));
    } else {
      setCar((prevCar) => ({
        ...prevCar,
        [name]: name === 'mileage' ? parseInt(value, 10) || 0 : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const carToSave = { ...car, ownerId: ownerId === '' ? undefined : ownerId };
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carToSave),
      });
      if (!response.ok) throw new Error('Failed to add car');
      navigate('/cars');
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
        <div className="mb-3">
          <label className="form-label">Owner</label>
          {loadingOwners ? (
            <div>Loading owners...</div>
          ) : owners.length === 0 ? (
            <div>
              <span>No owners found. </span>
              <Link to="/add-owner">Add a new owner</Link>
            </div>
          ) : (
            <select
              name="ownerId"
              className="form-control"
              value={ownerId}
              onChange={handleChange}
              required
            >
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.firstName} {owner.lastName} ({owner.email})
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          Save Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
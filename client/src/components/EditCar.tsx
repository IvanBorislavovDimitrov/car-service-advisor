import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Car } from '../model/car';
import { CarOwner } from '../model/car-owner';

const EditCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [owners, setOwners] = useState<CarOwner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarAndOwners = async () => {
      try {
        const [carRes, ownersRes] = await Promise.all([
          fetch(`/api/cars/${id}`),
          fetch('/api/cars/owners')
        ]);
        if (!carRes.ok) throw new Error('Failed to fetch car');
        if (!ownersRes.ok) throw new Error('Failed to fetch owners');
        const carData = await carRes.json();
        const ownersDataRaw = await ownersRes.json();
        // Map snake_case to camelCase for Car
        const car = {
          ...carData,
          ownerId: carData.owner_id
        };
        // Map snake_case to camelCase for CarOwner
        const owners = ownersDataRaw.map((o: any) => ({
          id: o.id,
          firstName: o.first_name,
          lastName: o.last_name,
          email: o.email
        }));
        setCar(car);
        setOwners(owners);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchCarAndOwners();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!car) return;
    const { name, value } = e.target;
    setCar({ ...car, [name]: name === 'ownerId' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update car');
      }
      navigate('/cars');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  if (!car) return null;

  return (
    <div className="container mt-4">
      <h2>Edit Car</h2>
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
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Owner</label>
          <select
            name="ownerId"
            className="form-select"
            value={car.ownerId || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.firstName} {owner.lastName} ({owner.email})
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;

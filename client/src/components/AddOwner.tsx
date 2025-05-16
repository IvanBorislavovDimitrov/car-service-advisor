import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarOwner } from '../model/car-owner';

const AddOwner: React.FC = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState<CarOwner>(new CarOwner(0, '', '', ''));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/cars/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(owner),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add owner');
      }
      navigate('/cars');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Car Owner</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={owner.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={owner.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={owner.email}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">
          Save Owner
        </button>
      </form>
    </div>
  );
};

export default AddOwner;

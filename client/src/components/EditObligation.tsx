import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Obligation } from '../model/obligation';
import { Car } from '../model/car';

const EditObligation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [obligation, setObligation] = useState<Obligation | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObligationAndCars = async () => {
      try {
        const [obligationRes, carsRes] = await Promise.all([
          fetch(`/api/obligations/${id}`),
          fetch('/api/cars')
        ]);
        if (!obligationRes.ok) throw new Error('Failed to fetch obligation');
        if (!carsRes.ok) throw new Error('Failed to fetch cars');
        const obligationData = await obligationRes.json();
        const carsData = await carsRes.json();
        // Map snake_case to camelCase for Obligation
        const obligation = {
          ...obligationData,
          name: obligationData.name,
          description: obligationData.description,
          startDate: obligationData.start_date,
          endDate: obligationData.end_date,
          status: obligationData.status,
          carId: obligationData.car_id,
          id: obligationData.id
        };
        setObligation(obligation);
        setCars(carsData.map((c: any) => ({
          ...c,
          ownerId: c.owner_id
        })));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchObligationAndCars();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!obligation) return;
    const { name, value } = e.target;
    setObligation({
      ...obligation,
      [name]: name === 'carId' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!obligation) return;
    try {
      // Prepare payload to match server expectation
      const payload = {
        name: obligation.name,
        description: obligation.description,
        startDate: obligation.startDate,
        endDate: obligation.endDate,
        status: obligation.status,
        carId: obligation.carId
      };
      const response = await fetch(`/api/obligations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update obligation');
      }
      navigate('/obligations');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  if (!obligation) return null;

  return (
    <div className="container mt-4">
      <h2>Edit Obligation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={obligation.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={obligation.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={obligation.startDate ? obligation.startDate.toString().substring(0, 10) : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={obligation.endDate ? obligation.endDate.toString().substring(0, 10) : ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            name="status"
            className="form-control"
            value={obligation.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Car</label>
          <select
            name="carId"
            className="form-select"
            value={obligation.carId || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} (VIN: {car.vin})
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">
          Update Obligation
        </button>
      </form>
    </div>
  );
};

export default EditObligation;

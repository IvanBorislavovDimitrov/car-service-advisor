import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Obligation } from '../model/obligation';
import { Car } from '../model/car';

const AddObligation: React.FC = () => {
    const navigate = useNavigate();

    const [obligation, setForm] = useState<Obligation>(new Obligation('', '', new Date(), new Date(), '', 0));
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data: Car[] = await response.json();
                setCars(data);

                // Set the initial carId to the first car's id if cars are available
                if (data.length > 0) {
                    setForm((prev) => ({ ...prev, carId: data[0].id }));
                }
            } catch (error) {
                console.error('Error fetching cars:', error);
                alert('Could not fetch cars');
            }
        };

        fetchCars();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...obligation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/obligations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obligation),
            });

            if (!res.ok) throw new Error('Failed to add obligation');
            navigate('/obligations');
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to create obligation');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Obligation</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" className="form-control" value={obligation.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" value={obligation.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="date" name="startDate" className="form-control" value={obligation.startDate.toISOString().split('T')[0]} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="date" name="endDate" className="form-control" value={obligation.endDate.toISOString().split('T')[0]} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input name="status" className="form-control" value={obligation.status} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Car</label>
                    <select name="carId" className="form-control" value={obligation.carId} onChange={handleChange} required>
                        <option value="" disabled>Select a car</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.brand} {car.model} (VIN: {car.vin})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Create</button>
            </form>
        </div>
    );
};

export default AddObligation;
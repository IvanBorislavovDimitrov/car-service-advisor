import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../model/car';

const CarList: React.FC = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data: Car[] = await response.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
                alert('Could not fetch cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Car List</h2>
                <button className="btn btn-primary" onClick={() => navigate('/add-car')}>
                    Add Car
                </button>
            </div>
            {loading ? (
                <p>Loading cars...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">No cars found.</td>
                            </tr>
                        ) : (
                            cars.map((car, index) => (
                                <tr key={car.id}>
                                    <td>{index + 1}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.vin}</td>
                                    <td>{car.mileage}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CarList;
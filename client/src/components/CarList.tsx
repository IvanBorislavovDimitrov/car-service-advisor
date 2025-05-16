import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../model/car';
import { CarOwner } from '../model/car-owner';

const CarList: React.FC = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState<Car[]>([]);
    const [owners, setOwners] = useState<CarOwner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [carsRes, ownersRes] = await Promise.all([
                    fetch('/api/cars'),
                    fetch('/api/cars/owners')
                ]);
                if (!carsRes.ok || !ownersRes.ok) {
                    throw new Error('Failed to fetch cars or owners');
                }
                const carsDataRaw: any[] = await carsRes.json();
                // Map snake_case to camelCase for Car
                const carsData: Car[] = carsDataRaw.map(c => ({
                    ...c,
                    ownerId: c.owner_id
                }));
                const ownersRaw: any[] = await ownersRes.json();
                // Map snake_case to camelCase for CarOwner
                const ownersData: CarOwner[] = ownersRaw.map(o => ({
                    id: o.id,
                    firstName: o.first_name,
                    lastName: o.last_name,
                    email: o.email
                }));
                setCars(carsData);
                setOwners(ownersData);
            } catch (error) {
                console.error('Error fetching cars or owners:', error);
                alert('Could not fetch cars or owners');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to get owner email by ownerId
    const getOwnerEmail = (ownerId?: number) => {
        const owner = owners.find(o => o.id === ownerId);
        return owner ? owner.email : '';
    };

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
                            <th>Owner Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">No cars found.</td>
                            </tr>
                        ) : (
                            cars.map((car, index) => (
                                <tr key={car.id}>
                                    <td>{index + 1}</td>
                                    <td>{car.brand}</td>
                                    <td>{car.model}</td>
                                    <td>{car.vin}</td>
                                    <td>{car.mileage}</td>
                                    <td>{getOwnerEmail(car.ownerId)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => navigate(`/edit-car/${car.id}`)}
                                        >
                                            Edit
                                        </button>
                                    </td>
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarOwner } from '../model/car-owner';

const OwnerList: React.FC = () => {
  const [owners, setOwners] = useState<CarOwner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/cars/owners');
        if (!response.ok) throw new Error('Failed to fetch owners');
        const data = await response.json();
        // Map snake_case to camelCase for CarOwner
        setOwners(data.map((o: any) => ({
          id: o.id,
          firstName: o.first_name,
          lastName: o.last_name,
          email: o.email
        })));
      } catch (err) {
        setOwners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Car Owners</h2>
        <Link to="/add-owner" className="btn btn-primary">
          Add Owner
        </Link>
      </div>
      {loading ? (
        <p>Loading owners...</p>
      ) : owners.length === 0 ? (
        <p>No owners found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, idx) => (
              <tr key={owner.id}>
                <td>{idx + 1}</td>
                <td>{owner.firstName}</td>
                <td>{owner.lastName}</td>
                <td>{owner.email}</td>
                <td>
                  <Link to={`/edit-owner/${owner.id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerList;

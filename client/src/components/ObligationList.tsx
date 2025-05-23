import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Obligation } from '../model/obligation';

const ObligationList: React.FC = () => {
  const [obligations, setObligations] = useState<Obligation[]>([]);

  useEffect(() => {
    fetch('/api/obligations')
      .then(res => res.json())
      .then(data => {
        const parsed = data.map((o: any) =>
          new Obligation(
            o.name,
            o.description,
            new Date(o.start_date), // Use start_date from the API response
            new Date(o.end_date),   // Use end_date from the API response
            o.status,
            o.car_id,
            o.id
          )
        );
        setObligations(parsed);
      })
      .catch(err => console.error('Error loading obligations:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Obligations</h2>
      <Link to="/add-obligation" className="btn btn-primary mb-3">Add New Obligation</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Car ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {obligations.map((o) => (
            <tr key={o.id}>
              <td>{o.name}</td>
              <td>{o.description}</td>
              <td>{o.startDate.toLocaleDateString()}</td>
              <td>{o.endDate.toLocaleDateString()}</td>
              <td>{o.status}</td>
              <td>{o.carId}</td>
              <td>
                <Link to={`/edit-obligation/${o.id}`} className="btn btn-sm btn-warning">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObligationList;
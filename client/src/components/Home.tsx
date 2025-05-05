import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 mb-4">Welcome to Car Service Advisor</h1>
      <p className="lead mb-4">
        Manage car records and keep your service history organized.
      </p>
      <Link to="/cars" className="btn btn-primary btn-lg">
        View Cars
      </Link>
    </div>
  );
};

export default Home;
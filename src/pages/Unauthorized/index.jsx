import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>401 - Unauthorized</h1>
        <p>Sorry, you don't have permission to access this page.</p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 
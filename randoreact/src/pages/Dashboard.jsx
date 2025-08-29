import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Dashboard from '../components/admin/Dashboard';

const DashboardPage = () => {


  return (
    <div className="container">
      {/* <h1>Bienvenue sur ma page de l'administrateur</h1> */}
      <hr />
      <Dashboard />
    </div>
  );
};


export default DashboardPage;


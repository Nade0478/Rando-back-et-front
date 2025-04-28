import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import des composants CustomNavbar et Footer
import Sidebar from './Sidebar';
import CardDashboard from './CardDashboard';
import TitleDashboard from './TitleDashboard';

const Dashboard = () => {

  return (
    <div className="container-fluid">
      <Sidebar />
        <TitleDashboard />
        <CardDashboard />
      </div>
  );
};

export default Dashboard;

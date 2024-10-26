import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CloudSun className="h-8 w-8 text-blue-500" />
            <Link to="/" className="text-xl font-bold text-gray-800 ml-2">
              Weather Monitor
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
            <Link to="/alerts" className="text-gray-700 hover:text-blue-500">Alerts</Link>
            <Link to="/history" className="text-gray-700 hover:text-blue-500">History</Link>
            <Link to="/settings" className="text-gray-700 hover:text-blue-500">Settings</Link>
            <Link to="/simulator" className="text-gray-700 hover:text-blue-500">Simulator</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
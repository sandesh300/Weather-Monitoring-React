import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudSun, Bell, Home, BarChart3, Cloud } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CloudSun className="h-8 w-8" />
            <span className="text-xl font-semibold">Weather Monitor</span>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 hover:text-blue-200 ${isActive('/') ? 'font-bold' : ''}`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/weather"
              className={`flex items-center space-x-1 hover:text-blue-200 ${isActive('/weather') ? 'font-bold' : ''}`}
            >
              <CloudSun className="h-5 w-5" />
              <span>Weather</span>
            </Link>

            <Link
              to="/alert-config"
              className={`flex items-center space-x-1 hover:text-blue-200 ${isActive('/alert-config') ? 'font-bold' : ''}`}
            >
              <Bell className="h-5 w-5" />
              <span>Alerts</span>
            </Link>

            <Link
              to="/summary"
              className={`flex items-center space-x-1 hover:text-blue-200 ${isActive('/summary') ? 'font-bold' : ''}`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Summaries</span>
            </Link>

            <Link
              to="/forecast"
              className={`flex items-center space-x-1 hover:text-blue-200 ${isActive('/forecast') ? 'font-bold' : ''}`}
            >
              <Cloud className="h-5 w-5" />
              <span>Forecasts</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

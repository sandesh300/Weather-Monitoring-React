import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import WeatherAlerts from './components/WeatherAlerts';
import CityWeather from './components/CityWeather';
import WeatherHistory from './components/WeatherHistory';
import AlertSettings from './components/AlertSettings';
import WeatherSimulator from './components/WeatherSimulator';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<WeatherAlerts />} />
            <Route path="/city/:cityName" element={<CityWeather />} />
            <Route path="/history" element={<WeatherHistory />} />
            <Route path="/settings" element={<AlertSettings />} />
            <Route path="/simulate" element={<WeatherSimulator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

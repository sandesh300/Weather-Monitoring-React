import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import WeatherData from './components/WeatherData';
import WeatherAlerts from './components/WeatherAlerts';
import { AlertProvider } from './context/AlertContext';
import AlertConfigurationPage from './components/AlertConfiguration';
import DailySummaryPage from './components/DailySummary';
import WeatherForecastPage from './components/WeatherForecast';

const App = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/weather" element={<WeatherData />} />
              <Route path="/alerts" element={<WeatherAlerts />} />
              <Route path="/alert-config" element={<AlertConfigurationPage />} />
              <Route path="/summary" element={<DailySummaryPage />} />
              <Route path="/forecast" element={<WeatherForecastPage />} />
              
            </Routes>
          </div>
        </div>
      </AlertProvider>
    </BrowserRouter>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';


const WeatherAlerts = () => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [configFormData, setConfigFormData] = useState({
    city: 'Delhi',
    parameter: 'temperature',
    threshold: 0,
    condition: 'GREATER_THAN',
    consecutiveUpdates: 1,
    enabled: true,
    email: ''
  });

  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const parameters = ['temperature', 'humidity', 'windSpeed'];
  const conditions = ['GREATER_THAN', 'LESS_THAN', 'EQUALS'];

  useEffect(() => {
    fetchActiveAlerts();
  }, []);

  const fetchActiveAlerts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/alerts/active/all');
      const data = await response.json();
      setActiveAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleSubmitConfig = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/alerts/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configFormData),
      });
      if (response.ok) {
        setShowConfigForm(false);
        fetchActiveAlerts();
      }
    } catch (error) {
      console.error('Error creating alert config:', error);
    }
  };

  const handleDeactivateAlert = async (alertId) => {
    try {
      await fetch(`http://localhost:8080/api/alerts/${alertId}/deactivate`, {
        method: 'PUT',
      });
      fetchActiveAlerts();
    } catch (error) {
      console.error('Error deactivating alert:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Weather Alerts</h1>
        <button
          onClick={() => setShowConfigForm(!showConfigForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {showConfigForm ? (
            <>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <span>New Alert</span>
            </>
          )}
        </button>
      </div>

      {showConfigForm && (
        <form onSubmit={handleSubmitConfig} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <select
              value={configFormData.city}
              onChange={(e) => setConfigFormData({ ...configFormData, city: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Parameter</label>
            <select
              value={configFormData.parameter}
              onChange={(e) => setConfigFormData({ ...configFormData, parameter: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              {parameters.map((param) => (
                <option key={param} value={param}>
                  {param}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              value={configFormData.condition}
              onChange={(e) => setConfigFormData({ ...configFormData, condition: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            >
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Threshold</label>
            <input
              type="number"
              value={configFormData.threshold}
              onChange={(e) => setConfigFormData({ ...configFormData, threshold: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={configFormData.email}
              onChange={(e) => setConfigFormData({ ...configFormData, email: e.target.value })}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Create Alert
          </button>
        </form>
      )}

<div className="space-y-4">
  {activeAlerts.map((alert) => (
    <Alert
      key={alert.id}
      severity="info"
      action={
        <button
          onClick={() => handleDeactivateAlert(alert.id)}
          className="ml-auto text-red-500 hover:text-red-700 transition-colors"
        >
          Deactivate
        </button>
      }
    >
      <AlertTitle>{alert.city}</AlertTitle>
      {alert.parameter} {alert.condition.toLowerCase()} {alert.threshold}
    </Alert>
  ))}
</div>

    </div>
  );
};

export default WeatherAlerts;

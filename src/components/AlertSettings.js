import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AlertSettings = () => {
  const [alertConfigs, setAlertConfigs] = useState([]);
  const [newConfig, setNewConfig] = useState({
    city: 'Delhi',
    maxTempThreshold: 35,
    minTempThreshold: 10,
    maxHumidityThreshold: 80,
    consecutiveReadings: 2,
    emailEnabled: true,
    email: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAlertConfigs();
  }, []);

  const fetchAlertConfigs = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlertConfigs(data);
    } catch (error) {
      console.error('Error fetching alert configs:', error);
      setMessage({ type: 'error', text: 'Failed to load alert configurations' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Alert configuration saved successfully!' });
        fetchAlertConfigs();
        setNewConfig({
          city: 'Delhi',
          maxTempThreshold: 35,
          minTempThreshold: 10,
          maxHumidityThreshold: 80,
          consecutiveReadings: 2,
          emailEnabled: true,
          email: ''
        });
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving alert config:', error);
      setMessage({ type: 'error', text: 'Failed to save alert configuration' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
      });
      setMessage({ type: 'success', text: 'Alert configuration deleted successfully!' });
      fetchAlertConfigs();
    } catch (error) {
      console.error('Error deleting alert config:', error);
      setMessage({ type: 'error', text: 'Failed to delete alert configuration' });
    }
  };

  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alert Settings</h1>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create New Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.city}
                  onChange={(e) => setNewConfig({ ...newConfig, city: e.target.value })}
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Temperature (°C)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.maxTempThreshold}
                  onChange={(e) => setNewConfig({ ...newConfig, maxTempThreshold: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Temperature (°C)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.minTempThreshold}
                  onChange={(e) => setNewConfig({ ...newConfig, minTempThreshold: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Humidity (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.maxHumidityThreshold}
                  onChange={(e) => setNewConfig({ ...newConfig, maxHumidityThreshold: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Consecutive Readings</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.consecutiveReadings}
                  onChange={(e) => setNewConfig({ ...newConfig, consecutiveReadings: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newConfig.email}
                  onChange={(e) => setNewConfig({ ...newConfig, email: e.target.value })}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={newConfig.emailEnabled}
                  onChange={(e) => setNewConfig({ ...newConfig, emailEnabled: e.target.checked })}
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable Email Alerts
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Alert
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Alert Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertConfigs.map((config) => (
              <div key={config.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{config.city}</h3>
                    <p>Max Temperature: {config.maxTempThreshold}°C</p>
                    <p>Min Temperature: {config.minTempThreshold}°C</p>
                    <p>Max Humidity: {config.maxHumidityThreshold}%</p>
                    <p>Consecutive Readings: {config.consecutiveReadings}</p>
                    <p>Email: {config.email}</p>
                    <p>Email Alerts: {config.emailEnabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(config.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

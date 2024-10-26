import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WeatherSimulator = () => {
  const [simulationData, setSimulationData] = useState({
    city: 'Delhi',
    temp: 30,
    humidity: 60,
    windSpeed: 5
  });

  const handleSimulate = async () => {
    try {
      await fetch('/api/alerts/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(simulationData),
      });
      alert('Simulation completed successfully!');
    } catch (error) {
      console.error('Error running simulation:', error);
      alert('Failed to run simulation');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Event Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={simulationData.city}
              onChange={(e) => setSimulationData({ ...simulationData, city: e.target.value })}
            >
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={simulationData.temp}
              onChange={(e) => setSimulationData({ ...simulationData, temp: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={simulationData.humidity}
              onChange={(e) => setSimulationData({ ...simulationData, humidity: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Wind Speed (m/s)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={simulationData.windSpeed}
              onChange={(e) => setSimulationData({ ...simulationData, windSpeed: parseFloat(e.target.value) })}
            />
          </div>

          <button
            onClick={handleSimulate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Run Simulation
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSimulator;
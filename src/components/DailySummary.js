import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Cloud, Droplets, Wind } from 'lucide-react';

const DailySummaryPage = () => {
  const [summaries, setSummaries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchSummaries();
  }, [selectedCity, dateRange]);

  const fetchSummaries = async () => {
    try {
      let url = 'http://localhost:8080/api/summary/latest';
      if (selectedCity) {
        url = `http://localhost:8080/api/summary/city/${selectedCity}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSummaries(selectedCity ? data : Object.values(data));
    } catch (error) {
      console.error('Error fetching summaries:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Daily Weather Summaries</h1>
        
        <div className="flex gap-4 mb-4">
          <select
            className="p-2 border rounded"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <input
            type="date"
            className="p-2 border rounded"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map((summary) => (
          <DailySummaryCard key={summary.id} summary={summary} />
        ))}
      </div>
    </div>
  );
};

const DailySummaryCard = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{summary.city}</h2>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(summary.date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Sun className="w-5 h-5 text-yellow-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{summary.avgTemperature.toFixed(1)}°C</p>
            <p className="text-xs text-gray-500">
              H: {summary.maxTemperature.toFixed(1)}° L: {summary.minTemperature.toFixed(1)}°
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Droplets className="w-5 h-5 text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-medium">{summary.avgHumidity.toFixed(1)}%</p>
          </div>
        </div>

        <div className="flex items-center">
          <Wind className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-medium">{summary.avgWindSpeed.toFixed(1)} m/s</p>
          </div>
        </div>

        <div className="flex items-center">
          <Cloud className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Conditions</p>
            <p className="font-medium">{summary.dominantWeatherCondition}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Weather Conditions</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(summary.weatherConditionCounts).map(([condition, count]) => (
            <span
              key={condition}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {condition}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailySummaryPage;
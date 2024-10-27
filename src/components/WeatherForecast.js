import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun, RefreshCw } from 'lucide-react';

const WeatherForecastPage = () => {
  const [forecasts, setForecasts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchForecasts();
  }, [selectedCity]);

  const fetchForecasts = async () => {
    try {
      setLoading(true);
      const url = selectedCity 
        ? `http://localhost:8080/api/forecast/${selectedCity}`
        : 'http://localhost:8080/api/forecast/current';
      const response = await fetch(url);
      const data = await response.json();
      setForecasts(selectedCity ? data : data);
    } catch (error) {
      console.error('Error fetching forecasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshForecast = async () => {
    if (selectedCity) {
      try {
        setLoading(true);
        await fetch(`http://localhost:8080/api/forecast/refresh/${selectedCity}`, { method: 'POST' });
        await fetchForecasts();
      } catch (error) {
        console.error('Error refreshing forecast:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Weather Forecast</h1>
          <div className="flex gap-4">
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
            
            <button
              onClick={refreshForecast}
              disabled={!selectedCity || loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.id} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

const ForecastCard = ({ forecast }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain':
        return <Droplets className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{forecast.city}</h2>
          <p className="text-gray-600">
            {new Date(forecast.forecastTime).toLocaleString()}
          </p>
        </div>
        {getWeatherIcon(forecast.mainCondition)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Sun className="w-5 h-5 text-yellow-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-medium">{forecast.temperature.toFixed(1)}°C</p>
            <p className="text-xs text-gray-500">
              Feels like: {forecast.feelsLike.toFixed(1)}°C
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Droplets className="w-5 h-5 text-blue-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-medium">{forecast.humidity.toFixed(1)}%</p>
          </div>
        </div>

        <div className="flex items-center">
          <Wind className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-medium">{forecast.windSpeed.toFixed(1)} m/s</p>
          </div>
        </div>

        <div className="flex items-center">
          <Cloud className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Cloud Cover</p>
            <p className="font-medium">{forecast.cloudCover}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-100 rounded p-3">
          <p className="text-sm font-medium">{forecast.description}</p>
          <p className="text-sm text-gray-600">
            Rain Probability: {forecast.rainProbability.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastPage;
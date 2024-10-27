import React, { useState, useEffect } from 'react';
import { CloudSun, Droplets, Wind } from 'lucide-react';

const HomePage = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  const fetchCurrentWeather = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/weather/current');
      const data = await response.json();
      console.log('Weather Data:', data);
      // Adjust based on the actual response structure
      setCurrentWeather(Array.isArray(data.weather) ? data.weather : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Weather Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentWeather.map((weather) => (
          <div 
            key={weather.city} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{weather.city}</h2>
                <p className="text-gray-500">{weather.mainCondition}</p>
              </div>
              <CloudSun className="h-8 w-8 text-blue-500" />
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-gray-800">
                  {weather.temperature}°C
                </div>
                <div className="text-sm text-gray-500">
                  Feels like {weather.feelsLike}°C
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{weather.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{weather.windSpeed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
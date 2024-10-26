import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CityWeather = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather/${cityName}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchHistory = async () => {
      try {
        const endTime = new Date();
        const startTime = new Date(endTime - 24 * 60 * 60 * 1000);
        const response = await fetch(
          `/api/weather/${cityName}/history?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
        );
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchWeatherData();
    fetchHistory();
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{cityName} Weather</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-4xl font-bold">{weatherData.temperature}°C</p>
              <p className="text-xl text-gray-500">{weatherData.mainCondition}</p>
            </div>
            <div className="space-y-2">
              <p>Feels like: {weatherData.feelsLike}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
              <p>Pressure: {weatherData.pressure} hPa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24-Hour Temperature History</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={800} height={400} data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

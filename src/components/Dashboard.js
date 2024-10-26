import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [cities, setcities] = useState([
    'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'
  ]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = {};
        for (const city of cities) {
          const response = await fetch(`/api/weather/${city}`);
          const result = await response.json();
          data[city] = result;
        }
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map(city => (
          <Link key={city} to={`/city/${city}`}>
            <Card>
              <CardHeader>
                <CardTitle>{city}</CardTitle>
              </CardHeader>
              <CardContent>
                {weatherData[city] && (
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">
                      {weatherData[city].temperature}°C
                    </p>
                    <p className="text-gray-500">
                      {weatherData[city].mainCondition}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>Humidity: {weatherData[city].humidity}%</p>
                      <p>Wind: {weatherData[city].windSpeed} m/s</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Temperature Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={800} height={400} data={Object.values(weatherData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
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

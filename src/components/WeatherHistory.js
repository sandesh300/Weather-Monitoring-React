import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WeatherHistory = () => {
  const [summaries, setSummaries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await fetch(
          `/api/summaries/${selectedCity}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
        );
        const data = await response.json();
        setSummaries(data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    fetchSummaries();
  }, [selectedCity, dateRange]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weather History</h1>
      
      <div className="flex space-x-4">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          className="border rounded p-2"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temperature Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={800} height={400} data={summaries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgTemperature" name="Average" stroke="#8884d8" />
            <Line type="monotone" dataKey="maxTemperature" name="Maximum" stroke="#82ca9d" />
            <Line type="monotone" dataKey="minTemperature" name="Minimum" stroke="#ffc658" />
          </LineChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summaries.map((summary, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-bold">{new Date(summary.date).toLocaleDateString()}</p>
                <p>Average Temperature: {summary.avgTemperature.toFixed(1)}°C</p>
                <p>Maximum Temperature: {summary.maxTemperature.toFixed(1)}°C</p>
                <p>Minimum Temperature: {summary.minTemperature.toFixed(1)}°C</p>
                <p>Dominant Weather: {summary.dominantWeatherCondition}</p>
                <p>Average Humidity: {summary.avgHumidity.toFixed(1)}%</p>
                <p>Average Wind Speed: {summary.avgWindSpeed.toFixed(1)} m/s</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

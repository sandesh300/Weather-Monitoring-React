import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weather Alerts</h1>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
            <AlertTitle>{alert.city}</AlertTitle>
            <AlertDescription>
              {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

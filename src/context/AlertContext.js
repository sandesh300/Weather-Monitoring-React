import React, { createContext, useState, useEffect } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [configFormData, setConfigFormData] = useState({
    city: 'Delhi',
    parameter: 'temperature',
    threshold: 0,
    condition: 'GREATER_THAN',
    consecutiveUpdates: 1,
    enabled: true,
    email: ''
  });

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
    <AlertContext.Provider value={{ activeAlerts, configFormData, setConfigFormData, handleSubmitConfig, handleDeactivateAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

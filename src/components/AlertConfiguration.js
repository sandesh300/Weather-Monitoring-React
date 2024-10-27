import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

const AlertConfigurationForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    city: '',
    parameter: 'temperature',
    threshold: 0,
    condition: 'GREATER_THAN',
    consecutiveUpdates: 1,
    enabled: true,
    email: '',
    ...initialData
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">City</label>
          <select 
            className="w-full p-2 border rounded"
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Parameter</label>
          <select 
            className="w-full p-2 border rounded"
            value={formData.parameter}
            onChange={(e) => setFormData({...formData, parameter: e.target.value})}
          >
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="wind_speed">Wind Speed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Threshold</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded"
            value={formData.threshold}
            onChange={(e) => setFormData({...formData, threshold: parseFloat(e.target.value)})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Condition</label>
          <select 
            className="w-full p-2 border rounded"
            value={formData.condition}
            onChange={(e) => setFormData({...formData, condition: e.target.value})}
          >
            <option value="GREATER_THAN">Greater Than</option>
            <option value="LESS_THAN">Less Than</option>
            <option value="EQUALS">Equals</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Consecutive Updates</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded"
            value={formData.consecutiveUpdates}
            onChange={(e) => setFormData({...formData, consecutiveUpdates: parseInt(e.target.value)})}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="col-span-2 flex items-center space-x-2">
          <input 
            type="checkbox" 
            checked={formData.enabled}
            onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
          />
          <label className="text-sm font-medium">Enabled</label>
        </div>
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? 'Update Alert' : 'Create Alert'}
      </button>
    </form>
  );
};

const AlertConfigurationList = ({ alerts, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">{alert.city} - {alert.parameter}</h3>
            </div>
            <p className="text-gray-600 text-sm">
              {alert.condition} {alert.threshold} for {alert.consecutiveUpdates} updates
            </p>
            <p className="text-gray-600 text-sm">Notify: {alert.email}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(alert)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(alert.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AlertConfigurationPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alert-configurations');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = editingAlert 
        ? `http://localhost:8080/api/alert-configurations/${editingAlert.id}`
        : 'http://localhost:8080/api/alert-configurations';
      
      const response = await fetch(url, {
        method: editingAlert ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchAlerts();
        setShowForm(false);
        setEditingAlert(null);
      }
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/alert-configurations/${id}`, { method: 'DELETE' });
      fetchAlerts();
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alert Configurations</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>New Alert</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <AlertConfigurationForm 
            onSubmit={handleSubmit}
            initialData={editingAlert}
          />
        </div>
      )}

      <AlertConfigurationList 
        alerts={alerts}
        onDelete={handleDelete}
        onEdit={(alert) => {
          setEditingAlert(alert);
          setShowForm(true);
        }}
      />
    </div>
  );
};

export default AlertConfigurationPage;
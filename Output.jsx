import React, { useState, useEffect } from 'react';
import './Output.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Output = () => {
  const [accuracy, setAccuracy] = useState({});
  const [removedCount, setRemovedCount] = useState(null); // ✅ New state for removed entries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccuracy = async () => {
      try {
        const [accuracyRes, removedRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/get_model_accuracies'),
          axios.get('http://127.0.0.1:5000/get_removed_entries_count') // ✅ New endpoint
        ]);

        setAccuracy(accuracyRes.data || {});
        setRemovedCount(removedRes.data.removed_entries);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccuracy();
  }, []);

  const downloadCSV = (filename) => {
    window.location.href = `http://127.0.0.1:5000/download/${filename}`;
  };

  return (
    <div className="output-container">
      <Sidebar />
      <div className="content">
        <h1>Water Quality Predictions</h1>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <h3>Model Accuracies</h3>
            <ul>
              {Object.entries(accuracy).map(([model, acc]) => (
                <li key={model}>
                  <strong>{model}:</strong> {typeof acc === 'number' ? acc.toFixed(4) : 'N/A'}
                </li>
              ))}
            </ul>

            {/* ✅ Display removed entries count */}
            <div className="removed-info">
              <h4>Removed Outdated Entries</h4>
              <p>
                {removedCount !== null
                  ? `${removedCount} entries removed (older than 6 years)`
                  : "Loading removed entries info..."}
              </p>
            </div>

            <div className="csv-buttons">
              <button onClick={() => downloadCSV("water_recyclability_predictions.csv")}>
                Download Predictions CSV
              </button>
              <button onClick={() => downloadCSV("water_quality_alerts.csv")}>
                Download Alerts CSV
              </button>
              {/* ✅ New button to download cleaned dataset */}
              <button onClick={() => downloadCSV("cleaned_water_quality.csv")}>
                Download Cleaned Dataset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Output;

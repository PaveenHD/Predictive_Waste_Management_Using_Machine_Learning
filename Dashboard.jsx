import React, { useState } from "react";
import {
  FaCloud,
  FaBolt,
  FaFlask,
  FaTint,
  FaSignOutAlt,
  FaUserCircle,
  FaChartBar,
  FaUpload,
  FaClipboardCheck,
  FaHandHoldingWater,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { BiSolidAdjustAlt } from "react-icons/bi";
import { SiSolid } from "react-icons/si";
import "../components/Dashboard.css";
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      alert("Only CSV files are allowed.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
    <main className="main-content">
  <header className="dashboard-header">
    <h2>User Dashboard</h2>
  
    <div className="header-right">
      <span className="last-access">Last access: 07 May 2025</span>
    </div>
  </header>



        {/* File Upload Section */}
        <section className="file-upload-section">
        <div className="search-container">
      <input
        type="text"
        className="dashboard-search"
        placeholder="Enter your company name"
      />
    </div>
          <h3 className="csv">Upload CSV File</h3>  
          <div
            className="file-dropbox"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileUpload"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="fileUpload" className="upload-label">
              <FaUpload className="upload-icon" />
              {selectedFile ? (
                <span>{selectedFile.name}</span>
              ) : (
                <span>Drag & Drop CSV file here or Click to Upload</span>
              )}
            </label>
          </div>
        </section>

        {/* Status Section */}
        <section className="status-section">
          <h3 className="status">Current Status</h3>
          <div className="status-cards">
            {/* Repeat these cards for each status */}
            <div className="card">
              <FaHandHoldingWater className="icon red" />
              <p>
                pH: <strong>6.5</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon gold" />
              <p>
                Hardness: <strong>300</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon blue" />
              <p>
                Solids: <strong>500</strong>{" "}
                <span className="status clean">(Clean)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon yellow" />
              <p>
                Chloramines: <strong>4</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon red" />
              <p>
                Sulphate: <strong>250</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon gold" />
              <p>
                Organic Carbon: <strong>5</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon blue" />
              <p>
                Trihalomethanes <strong>80</strong>{" "}
                <span className="status clean">(Clean)</span>
              </p>
            </div>
            <div className="card">
              <FaHandHoldingWater className="icon yellow" />
              <p>
                Turbidity <strong>5</strong>{" "}
                <span className="status normal">(Normal)</span>
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer>
          <h1>Deadline of your uploaded report : Expires in(1 December 2026)</h1>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;

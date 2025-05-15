// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Graph.css";
// import Sidebar from "./Sidebar";

// const UploadGraphs = () => {
//   const [charts, setCharts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCharts = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:5000/get_upload_charts");
//         setCharts(response.data); // { monthly_recyclability_2023: "/charts/monthly_recyclability_2023.png", ... }
//       } catch (err) {
//         console.error("Error fetching charts:", err);
//         setError("Failed to load charts. Make sure the backend is running.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCharts();
//   }, []);

//   return (
//     <div className="graph-container">
//       <Sidebar />
//       <div className="content">
//         <h1>Uploaded Recyclability Charts</h1>

//         {loading && <p>Loading charts...</p>}
//         {error && <p className="error-message">{error}</p>}

//         {!loading && !error && Object.keys(charts).length === 0 && (
//           <p>No charts available.</p>
//         )}

//         {!loading && !error && Object.keys(charts).length > 0 && (
//           <div className="graph-grid">
//             {Object.entries(charts).map(([name, path]) => (
//               <div key={name} className="graph-box">
//                 <h2>{name.replaceAll("_", " ")}</h2>
//                 <img
//                   src={`http://127.0.0.1:5000${path}`}
//                   alt={name}
//                   className="confusion-matrix"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadGraphs;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Graph.css";
import Sidebar from "./Sidebar";

const UploadGraphs = () => {
  const [charts, setCharts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_upload_charts");
        setCharts(response.data);
      } catch (err) {
        console.error("Error fetching charts:", err);
        setError("Failed to load charts. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  const handleDownload = () => {
    window.open("http://127.0.0.1:5000/download_all_graphs", "_blank");
  };

  return (
    <div className="graph-container">
      <Sidebar />
      <div className="content">
        <div className="header-with-button">
          <h1>Uploaded Recyclability Charts</h1>
          <button className="download-button" onClick={handleDownload}>
            Download All
          </button>
        </div>

        {loading && <p>Loading charts...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && Object.keys(charts).length === 0 && (
          <p>No charts available.</p>
        )}

        {!loading && !error && Object.keys(charts).length > 0 && (
          <div className="graph-grid">
            {Object.entries(charts).map(([name, path]) => (
              <div key={name} className="graph-box">
                <h2>{name.replaceAll("_", " ")}</h2>
                <img
                  src={`http://127.0.0.1:5000${path}`}
                  alt={name}
                  className="confusion-matrix"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadGraphs;

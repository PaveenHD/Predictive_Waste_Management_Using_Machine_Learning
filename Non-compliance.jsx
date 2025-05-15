import React from 'react'
import './Non-compliance.css'
import Sidebar from './Sidebar'
function Noncompliance() {
  const fontStyle = {
    fontWeight: 'bold',  
    fontSize: '16px',    
    color: '#333',      
  };
  return (
    <div className="compliance-container">
    <div className="compliance-content">
      <h1 className="rule1">Rules Restricted By CPCB & SPCB</h1>
      <ul className="rule-ul">
        <li className="rule-li">
         <span style={fontStyle}>1. </span>Discharging Untreated or Partially Treated Wastewater – Industries must treat wastewater before discharge to prevent pollution of natural water bodies.

        </li>
        <li className="rule-li">
         <span style={fontStyle}>2. </span> Exceeding Permissible Limits of Pollutants – Effluents must comply with CPCB standards for BOD, COD, TDS, heavy metals, and other contaminants.

        </li>
        <li className="rule-li">
         <span style={fontStyle}>3. </span> Tampering with or Bypassing Effluent Treatment Plants (ETPs) – Illegal practices like bypassing ETPs or diluting effluents before discharge are strictly prohibited.


        </li>
        <li className="rule-li">
         <span style={fontStyle}>4. </span>  Using Borewells for Effluent Disposal – Direct injection of untreated wastewater into groundwater is a punishable offense.



        </li>
        <li className="rule-li">
         <span style={fontStyle}>5. </span> 
Failure to Implement Zero Liquid Discharge (ZLD) Where Required – Industries in ZLD-mandated areas must recycle and reuse all wastewater instead of discharging it.


        </li>
        <li className="rule-li">
         <span style={fontStyle}>6. </span> Improper Handling of Sludge and Hazardous Waste – ETP sludge containing toxic chemicals must be disposed of as per hazardous waste management guidelines.

        </li>
        <li className="rule-li">
         <span style={fontStyle}>7. </span> Releasing Colored or Foamy Wastewater – Textile and dyeing units must ensure removal of synthetic dyes and chemicals before water discharge.


        </li>
        <li className="rule-li">
         <span style={fontStyle}>8. </span> 
Failure to Monitor & Report Effluent Quality – Industries must conduct regular wastewater testing and submit reports to pollution control authorities.


        </li>
        <li className="rule-li">
         <span style={fontStyle}>9. </span> Using Banned or Hazardous Chemicals in Recycling – Toxic substances like heavy metals, banned dyes, and persistent organic pollutants must not be used.

        </li>
        <li className="rule-li">
         <span style={fontStyle}>10. </span>
         Wasting Freshwater Resources – Industries should adopt rainwater harvesting and maximize treated water reuse to minimize freshwater consumption.

        </li>
      </ul>
    </div>
    <Sidebar />
  </div>
  )
}

export default Noncompliance

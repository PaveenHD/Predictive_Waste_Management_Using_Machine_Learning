import React from 'react';
import './compliance.css';
import Sidebar from './Sidebar'; 

function Compliance() {
    const fontStyle = {
        fontWeight: 'bold',  
        fontSize: '16px',    
        color: '#333',      
      };
  return (
    <div className="compliance-container">
      <div className="compliance-content">
        <h1 className="rule1">Rules Followed By CPCB & SPCB</h1>
        <ul className="rule-ul">
          <li className="rule-li">
           <span style={fontStyle}>1.</span> The implementation of the Charter will be considered to be commenced on the date of issuance of directions/instructions from SPCBs/PCCs and the entire action plan will be implemented before Dec 31, 2022.
            (First phase 31st Dec 2021 & second phase 31st Dec 2022)
          </li>
          <li className="rule-li">
           <span style={fontStyle}>2.</span> Participating Textile Mills will submit their time bound action plans in the affidavit format
to their respective SPCBs / PCCs for implementation of the Charter as per the Plan of
Activities and other Terms & Conditions.

          </li>
          <li className="rule-li">
           <span style={fontStyle}>3.</span> Textile Mills shall sign MoUs/ Agreements with their selected Third Parties BTRA /
(Associations / CTRI) to participate in the program as per the Plan of Activities and to
reimburse the third party expenditure and shall sanction the project as per their mutual agreed
ToR.

          </li>
          <li className="rule-li">
           <span style={fontStyle}>4.</span>  No regulatory impediments: Any process modification, construction activity or any other
action required to be under taken by a mill in pursuit of the objectives of this Charter should
obtain necessary clearances from SPCBs with utmost speed. Concerned authorities should set
in place a fast-track, single-window clearance mechanism. (SPCB must reply within 15 days
from the date of query with suggestion otherwise it will be considered as approved.)



          </li>
          <li className="rule-li">
           <span style={fontStyle}>5.</span> CPCB/SPCBs directives / guidelines will be allowed to achieve short term, and long term
objectives as prescribed by the Charter within the agreed implementation period. Participating
Textile Mills will not be allowed, under any circumstances, for by passing of ETP systems
and discharge of partially /untreated effluent or episodic discharge. In case of any violation,
SPCBs/ PCCs will take appropriate actions, including issuance of appropriate directions
under the provisions of Water/Air Acts/ Environment (Protection) Act.


          </li>
          <li className="rule-li">
           <span style={fontStyle}>6.</span> Any order/direction prescribed by any Court of Law/Tribunal in respect of individual
industrial unit or in general, shall over rule the provisions/norms prescribed under this Charter,
and shall be complied by the industry.

          </li>
          <li className="rule-li">
           <span style={fontStyle}>7.</span>SPCBs / PCCs may prescribe conditions /norms, etc. stringent than those prescribed under
this Charter, and shall be complied by the industry.

          </li>
          <li className="rule-li">
           <span style={fontStyle}>8.</span> MoEF /CPCB/ SPCBs /PCCs may issues directions /instructions and /or take up programs
for implementation of advanced technological and managerial tools to achieve further higher
technological and compliance status in future for prevention, control and abatement of
environmental pollution and to meet the objectives of National Mission for Clean
Ganga(NMCG).

          </li>
          <li className="rule-li">
           <span style={fontStyle}>9.</span> For any clarification and modification in the Charter, Chairman, CPCB will be thesole
           authority.
          </li>

        </ul>
      </div>
      <Sidebar />
    </div>
  );
}

export default Compliance;

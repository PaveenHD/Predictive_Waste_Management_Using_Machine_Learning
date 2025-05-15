import React from "react";
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
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { LuFileOutput } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { BiSolidAdjustAlt } from "react-icons/bi";
import { SiSolid } from "react-icons/si";
import './Sidebar.css';


const Sidebar = () => {
  return (
    <div>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-header">User Panel</h2>
        <div className="user-profile">
          <FaUserCircle size={60} />
        </div>
        <nav>
          <ul className="list">
            <li className="active">
              <Link to="/dashboard">
                <MdDashboard className="nav-icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/graph">
                <FaChartBar className="nav-icon" /> Graph
              </Link>
            </li>
            <li>
              <Link to="/output">
                <LuFileOutput  className="nav-icon" /> Output
              </Link>
            </li>
            <li>
              <Link to="/compliance">
                <FaClipboardCheck className="nav-icon" /> Compliance
              </Link>
            </li>
            <li>
              <Link to="/noncompliance">
                <RxCross2 className="nav-icon" /> Non-Compliance
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaSignOutAlt className="nav-icon" /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;


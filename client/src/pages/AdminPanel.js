import React, { useState } from 'react';
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import '../styles/AdminPanel.scss';

const AdminPanel = () => {
  const user = useSelector(state => state.user);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className='admin-panel'>
    <div className='d-flex bg-light admin-container'>
      <aside className={`bg-white d-flex flex-column p-3 shadow-sm admin-sidebar ${isSidebarVisible ? 'd-block' : 'd-none d-md-flex'}`}>
        <div className='user-icon d-flex flex-column align-items-center mb-4'>
          <FaUserCircle size={50} className='mb-2' />
          <span className='fw-bold'>Admin</span>
          {/* <span>{user.user.role}</span> */}
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link className="nav-link" to={'all-users'}>
              <i className="bi bi-people me-2"></i> All Users
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link className="nav-link" to={'products'}>
              <i className="bi bi-upload me-2"></i> Upload Product
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link className="nav-link" to={'settings'}>
              <i className="bi bi-gear me-2"></i> Settings
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link className="nav-link" to={'logout'}>
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Link>
          </li>
        </ul>
      </aside>
      <main className='p-3 overflow-auto main-container'>
        <button className="btn btn-primary d-md-none mb-3" onClick={toggleSidebar}>
          <FaBars />
        </button>
       <Outlet/>
      </main>
    </div>
    </div>
  );
}

export default AdminPanel;

import React, { useState } from "react";
import Logo from "./Logo";
import { FaSearch, FaUserCircle, FaShoppingCart, FaUser, FaCog, FaSignOutAlt, FaBell } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../comman";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(SummaryApi.user_logout, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUserDetails(null));
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
  };

  return (
    <header className="shadow-lg p-3 bg-white rounded">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="d-flex align-items-center search-container">
          <input
            type="text"
            className="form-control me-2 search-box"
            placeholder="Search..."
          />
          <button className="btn btn-outline-secondary">
            <FaSearch />
          </button>
        </div>
        <div className="d-flex align-items-center">
          {user.user && user.user._id && (
            <div className="user-icon me-3 position-relative" onClick={toggleSubmenu}>
              <FaUserCircle />
              {submenuVisible && (
                <div className="submenu position-absolute bg-white shadow-sm rounded">
                  <Link to="/profile" className="dropdown-item d-flex align-items-center">
                    <FaUser className="me-2" /> Profile
                  </Link>
                  <Link to="/admin-panel" className="dropdown-item d-flex align-items-center">
                    <RiAdminLine className="me-2" /> Admin Panel
                  </Link>
                  <Link to="/notifications" className="dropdown-item d-flex align-items-center">
                    <FaBell className="me-2" /> Notifications
                  </Link>
                  <Link to="/settings" className="dropdown-item d-flex align-items-center">
                    <FaCog className="me-2" /> Settings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="cart-icon position-relative">
            <FaShoppingCart />
            <div className="text-white rounded-circle position-absolute top-0 start-100 translate-middle p-1 d-flex align-items-center justify-content-center ecillpse-class">
              <span className="small ecillpse-font">0</span>
            </div>
          </div>
          <div>
            {user.user && user.user._id ? (
              <button onClick={handleLogout} className="btn btn-primary rounded-pill ms-3 mt-1 login-button">
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-primary rounded-pill ms-3 mt-1 login-button"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React from "react";
import Logo from "./Logo";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="shadow-sm p-3 bg-body-tertiary rounded bg-white">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to={"/"}>
          <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="d-flex align-items-center search-container">
          <input type="text" className="form-control me-2 search-box" placeholder="Search..." />
          <button className="btn btn-outline-secondary">
            <FaSearch />
          </button>
        </div>
        <div className="d-flex align-items-center">
          <div className="user-icon me-3">
            <FaUserCircle />
          </div>
          <div className="cart-icon position-relative">
            <FaShoppingCart />
            <div className="bg-danger text-white rounded-circle position-absolute top-0 start-100 translate-middle p-1 d-flex align-items-center justify-content-center ecillpse-class">
              <span className="small ecillpse-font">0</span>
            </div>
          </div>
          <div>
          <Link to={'/login'} className="btn btn-primary rounded-pill ms-3 mt-1 login-button">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

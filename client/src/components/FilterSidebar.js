import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FilterSidebar.scss';

const FilterSidebar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortOrder, setSortOrder] = useState('');

  const handlePriceChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setPriceRange(value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const applyFilters = () => {
    onFilterChange({ priceRange, sortOrder });
  };

  return (
    <div className="filter-sidebar">
      <h5>Filters</h5>

      <div className="form-group">
        <label>Price Range</label>
        <div>
          <div className="form-check">
            <input
              type="radio"
              id="price1"
              name="priceRange"
              value={[0, 50]}
              className="form-check-input"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="price1">
              $0 - $50
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price2"
              name="priceRange"
              value={[50, 100]}
              className="form-check-input"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="price2">
              $50 - $100
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="price3"
              name="priceRange"
              value={[100, 200]}
              className="form-check-input"
              onChange={handlePriceChange}
            />
            <label className="form-check-label" htmlFor="price3">
              $100 - $200
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sortOrder">Sort By</label>
        <select
          className="form-control"
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="">Select</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;

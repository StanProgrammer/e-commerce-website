import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchCategoryWise from '../helpers/fetchCategoryWise';
import FilterSidebar from './FilterSidebar';
import '../styles/CategoryPage.scss';

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { category, heading } = location.state || {};

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWise(category);
    setLoading(false);
    const productData = categoryProduct.data || [];
    setData(productData);
    setFilteredData(productData);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const onFilterChange = ({ priceRange, sortOrder }) => {
    let filtered = data.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    if (sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredData(filtered);
  };

  return (
    <div className='category-page'>

      <h1 className="my-4">{heading}</h1>
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar onFilterChange={onFilterChange} />
        </div>
        <div className="container col-md-9 category-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {filteredData.map((product, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src={product.productImage} className="card-img-top" alt={product.productName} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">${product.price}</p>
                      <button className="btn btn-primary mt-auto">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

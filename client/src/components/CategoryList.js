import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CategoryList.scss';
import SummaryApi from '../comman';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SummaryApi.category_product);
      setCategoryProduct(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const categories = categoryProduct.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <div className="category-list">
      <div className="mx-auto p-3">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-between">
            {categories.map((category, index) => {
              const product = categoryProduct.find(prod => prod.category === category);
              return (
                <div className="category-item text-center" key={index}>
                  <img src={product.productImage[0]} alt={category} className="category-img" />
                  <p className="category-name">{category}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;

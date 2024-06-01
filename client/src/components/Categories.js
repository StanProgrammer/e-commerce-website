import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Categories.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../comman';

const Categories = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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

  const capitalizeFirstWord = (string) => {
    const words = string.split(' ');
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
  };

  const categories = categoryProduct.reduce((acc, product) => {
    if (!acc.find(item => item.category === product.category)) {
      acc.push({
        heading:capitalizeFirstWord(product.category),
        category: product.category,
        image: product.productImage[0]
      });
    }
    return acc;
  }, []);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
      scrollRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleShopNowClick = (category,heading) => {
    console.log(heading)
    navigate('/category-page', { state: { category, heading: heading } });
  };

  return (
    <div className='categories'>
      <div className="categories-wrapper">
        <center><h1>Categories</h1></center>
        <div className="categories-nav">
          <FaChevronLeft className="nav-icon" onClick={() => scroll(-600)} />
          <div className="categories-container" ref={scrollRef}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              categories.map((item, index) => (
                <div key={index} className="categories-card">
                  <img
                    className="categories-card-img"
                    src={item.image}
                    alt={item.category}
                  />
                  <div className="categories-card-overlay">
                    <h2 className="categories-card-title">{item.heading}</h2>
                    <button 
                      className="categories-card-btn" 
                      onClick={() => handleShopNowClick(item.category,item.heading)}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <FaChevronRight className="nav-icon" onClick={() => scroll(600)} />
        </div>
      </div>
    </div>
  );
};

export default Categories;

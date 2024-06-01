import React, { useEffect, useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import fetchCategoryWise from '../helpers/fetchCategoryWise';

const CategoryProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(6).fill(null);
  const scrollRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWise(category);
    setLoading(false);
    setData(categoryProduct.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
      scrollRef.current.style.scrollBehavior = 'smooth'; // Enable smooth scrolling
    }
  };

  const trimProductName = (name) => {
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
  };

  return (
    <div className="my-4">
      <h2 className="text-center">{heading}</h2>
      <div className="position-relative">
        <button
          className="btn btn-primary position-absolute top-50 start-0 translate-middle-y"
          onClick={() => scroll(-900)}
          style={{ zIndex: 1 }}
        >
          <FaChevronLeft />
        </button>
        <div className="d-flex overflow-hidden" ref={scrollRef} style={{ gap: '1rem' }}>
          {loading ? (
            loadingList.map((_, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
                <div className="card w-100">
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <div className="placeholder w-100" style={{ height: '200px', backgroundColor: '#e0e0e0' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            Array.isArray(data) && data.length > 0 ? (
              data.map((product, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" style={{ minWidth: '300px' }}>
                  <div className="card w-100 d-flex flex-column">
                    <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                      <img src={product.productImage[0]} className="w-100" alt={product.productName} />
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            {product.selling < product.price && (
                              <span className="badge bg-danger ms-2">
                                -{Math.round(((product.price - product.selling) / product.price) * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </div>
                      </a>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <a href="" className="text-reset">
                        <h5 className="card-title mb-3">{trimProductName(product.productName)}</h5>
                      </a>
                      <a href="" className="text-reset">
                        <p>{product.category}</p>
                      </a>
                      <h6 className="mb-3">
                        <s>${product.price}</s>
                        <strong className="ms-2 text-danger">${product.selling}</strong>
                      </h6>
                      <button className="btn btn-primary mt-auto">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products found in this category.</p>
            )
          )}
        </div>
        <button
          className="btn btn-primary position-absolute top-50 end-0 translate-middle-y"
          onClick={() => scroll(900)}
          style={{ zIndex: 1 }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategoryProduct;

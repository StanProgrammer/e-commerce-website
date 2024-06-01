// src/components/ProductCard.js
import React from "react";
import "../styles/ProductCard.scss";

const truncateNumber = (num) => {
  const numStr = num.toString();
  return numStr.length > 10 ? numStr.slice(0, 7) + "..." : numStr;
};

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="card h-100">
        <img src={product.productImage[0]} alt={product.productName} className="card-img-top" />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="product-title mb-0">{product.productName}</h5>
            <h5 className="text-dark mb-0">${truncateNumber(product.selling)}</h5>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="ms-auto text-warning">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
          </div>
          <div className="mt-auto d-flex justify-content-between">
            <button className="btn btn-outline-primary" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn btn-outline-danger" onClick={() => onDelete(product)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

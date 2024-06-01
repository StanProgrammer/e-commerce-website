import React, { useEffect, useState } from 'react';
import UploadProductModal from '../components/UploadProductModal';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import SummaryApi from '../comman';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Products.scss';

const Products = () => {
  const [modalShow, setModalShow] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleShow = () => setModalShow(true);
  const handleClose = () => {
    setModalShow(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(SummaryApi.get_product);
      setAllProduct(response?.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setModalShow(true);
  };

  const handleDeleteProduct = async (product) => {
    try {
      await axios.delete(`${SummaryApi.delete_product}/${product._id}`);
      fetchAllProduct(); // Refetch products after deletion
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [modalShow]);

  return (
    <div className='container'>
      <div className='bg-white p-2 px-2 mb-3 d-flex justify-content-between align-items-center overflow-auto'>
        <h2 className='fw-bold fs-4'>All Products</h2>
        <button className='btn btn-outline-primary py-2 px-4 rounded-pill' onClick={handleShow}>
          Upload Product
        </button>
      </div>
      <div className="row">
        {allProduct.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <ProductCard product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
          </div>
        ))}
      </div>
      <UploadProductModal
        show={modalShow}
        handleClose={handleClose}
        product={selectedProduct}
        update={isEditMode}
      />
    </div>
  );
}

export default Products;

import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadImage';
import ImagePopup from './ImagePopup';
import '../styles/UploadProductModal.scss';
import axios from 'axios';
import SummaryApi from '../comman';

const UploadProductModal = ({ show, handleClose, product, update = false }) => {
    const [data, setData] = useState({
        productName: product?.productName || "",
        brandName: product?.brandName || "",
        category: product?.category || "",
        productImage: product?.productImage || [],
        description: product?.description || "",
        price: product?.price || "",
        selling: product?.selling || ""
    });
    

    const [uploadProductImages, setUploadProductImages] = useState([]);
    const [fileNames, setFileNames] = useState(product?.productImage?.map((image, index) => `image-${index}`) || []);
    const [loading, setLoading] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setData({
                productName: product.productName,
                brandName: product.brandName,
                category: product.category,
                productImage: product.productImage,
                description: product.description,
                price: product.price,
                selling: product.selling
            });
            setFileNames(product.productImage.map((image, index) => `image-${index}`));
        }
    }, [product]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUploadProduct = (e) => {
        const files = Array.from(e.target.files);
        const uniqueFiles = files.filter(file => !fileNames.includes(file.name));
        
        if (uniqueFiles.length !== files.length) {
            alert("Duplicate files detected. Only unique files will be uploaded.");
        }

        setUploadProductImages(prevImages => [...prevImages, ...uniqueFiles]);
        setFileNames(prevNames => [...prevNames, ...uniqueFiles.map(file => file.name)]);
    };

    const removeImage = (index) => {
        const updatedProductImages = [...data.productImage];
        const updatedUploadProductImages = [...uploadProductImages];
        if (index < data.productImage.length) {
            updatedProductImages.splice(index, 1);
            setData(prevData => ({
                ...prevData,
                productImage: updatedProductImages
            }));
        } else {
            updatedUploadProductImages.splice(index - data.productImage.length, 1);
            setUploadProductImages(updatedUploadProductImages);
        }
        setFileNames(prevNames => prevNames.filter((_, i) => i !== index));
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImagePopup(true);
    };

    const handleCloseImagePopup = () => {
        setShowImagePopup(false);
        setSelectedImage(null);
    };

    const resetForm = () => {
        setData({
            productName: "",
            brandName: "",
            category: "",
            productImage: [],
            description: "",
            price: "",
            selling: ""
        });
        setUploadProductImages([]);
        setFileNames([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setLoading(true);

        try {
            const uploadToCloud = await Promise.all(uploadProductImages.map(file => uploadImage(file)));
            const updatedData = {
                ...data,
                productImage: [...data.productImage, ...uploadToCloud]
            };

            console.log('Form data:', updatedData);
            let response;
            if (update) {
                response = await axios.put(`${SummaryApi.update_product}/${product._id}`, updatedData);
            } else {
                response = await axios.post(SummaryApi.upload_product, updatedData);
            }
            console.log(response.data.message);
            resetForm();
            setLoading(false);
            setSubmitting(false);
            handleClose();
        } catch (error) {
            console.log(error);
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={submitting ? null : handleModalClose} backdrop={submitting ? 'static' : true}>
                <Modal.Header closeButton={!submitting}>
                    <Modal.Title>{update ? "Edit Product" : "Upload Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name:</label>
                            <input
                                placeholder='Product Name'
                                type="text"
                                className="form-control"
                                id="productName"
                                name="productName"
                                value={data.productName}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Product Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                placeholder='Product Description'
                                value={data.description}
                                onChange={handleOnChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="brandName" className="form-label">Brand Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Brand Name'
                                id="brandName"
                                name="brandName"
                                value={data.brandName}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
                            <select
                                className="form-control"
                                id="category"
                                name="category"
                                value={data.category}
                                onChange={handleOnChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {productCategory.map((category) => (
                                    <option key={category.id} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                placeholder='Price'
                                value={data.price}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="selling" className="form-label">Selling Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="selling"
                                name="selling"
                                value={data.selling}
                                onChange={handleOnChange}
                                placeholder='Selling Price'
                                required
                            />
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <label htmlFor="productImages" className="form-label me-3">Product Images:</label>
                            <input
                                type="file"
                                className="d-none"
                                id="productImages"
                                name="productImages"
                                onChange={handleUploadProduct}
                                multiple
                            />
                            <Button onClick={() => document.getElementById('productImages').click()}>
                                Upload Images
                            </Button>
                        </div>
                        <div className="mt-2">
                            {fileNames.join(', ')}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preview:</label>
                            <div className="d-flex flex-wrap">
                                {data.productImage.concat(uploadProductImages).map((image, index) => (
                                    <div key={index} className="me-2 mb-2 position-relative">
                                        <img
                                            src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                            alt={`product-${index}`}
                                            className="img-thumbnail"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={() => handleImageClick(typeof image === "string" ? image : URL.createObjectURL(image))}
                                        />
                                        <MdCancel
                                            className="position-absolute top-0 start-100 translate-middle"
                                            style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
                                            onClick={() => removeImage(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose} disabled={submitting}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={submitting}>
                                {submitting && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />}
                                {update ? "Update" : "Upload"}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
                {loading && <div>Loading...</div>}
            </Modal>
            {selectedImage && (
                <ImagePopup
                    show={showImagePopup}
                    handleClose={handleCloseImagePopup}
                    imageUrl={selectedImage}
                />
            )}
        </>
    );
};

export default UploadProductModal;

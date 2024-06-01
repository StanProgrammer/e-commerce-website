// src/components/ImagePopup.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImagePopup = ({ show, handleClose, imageUrl }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Button variant="close" onClick={handleClose} className="position-absolute top-0 end-0 m-2">
         
        </Button>
        <img
          src={imageUrl}
          alt="Preview"
          className="img-fluid"
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImagePopup;

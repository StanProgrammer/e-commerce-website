// src/uploadImage.js
import axios from 'axios';
import { cloudinaryConfig } from './cloudinaryConfig';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryConfig.upload_preset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error.response ? error.response.data : error.message);
  }
};

export default uploadImage;

const productModel = require('../../models/productModel');
const constants = require('../../util/constants');
const { productSchema } = require('../../util/validation');

const UploadProduct = async (req, res) => {
  try {

    const { error, value } = productSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
          message: error.details[0].message,
          error: true,
          success: false
      });
  }
    const {
      productName,
      brandName,
      category,
      productImage, 
      description,
      price,
      selling
    } = value;

    

    const newProduct = new productModel({
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      selling
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: constants.PRD_UP_SC,
      data: savedProduct,
      error: false,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: constants.PRD_UP_FL,
      error: true,
      success: false
    });
  }
};

module.exports = UploadProduct;

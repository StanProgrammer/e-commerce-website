const productModel = require('../../models/productModel');
const constants = require('../../util/constants');
const { productSchema } = require('../../util/validation');

const UpdateProduct = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = productSchema.validate(req.body);
    if (error) {
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

    // Find the existing product by ID
    const productId = req.params.id;
    const existingProduct = await productModel.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: constants.PRD_NT_FD,
        error: true,
        success: false
      });
    }

    // Update product details
    existingProduct.productName = productName;
    existingProduct.brandName = brandName;
    existingProduct.category = category;
    existingProduct.productImage = productImage;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.selling = selling;

    const updatedProduct = await existingProduct.save();
    
    res.status(200).json({
      message: constants.PRD_UPD_SC,
      data: updatedProduct,
      error: false,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: constants.PRD_UPD_FL,
      error: true,
      success: false
    });
  }
};

module.exports = UpdateProduct;

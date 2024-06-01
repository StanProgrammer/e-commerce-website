const productModel = require('../../models/productModel');
const constants = require('../../util/constants');

const DeleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the existing product by ID
    const existingProduct = await productModel.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({
        message: constants.PRD_NT_FD,
        error: true,
        success: false
      });
    }

    // Delete the product
    await productModel.findByIdAndDelete(productId);

    res.json({
      message: constants.PRD_DEL_SC,
      success: true,
      error: false,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      message: constants.PRD_DEL_FL,
      error: true,
      success: false
    });
  }
};

module.exports = DeleteProduct;

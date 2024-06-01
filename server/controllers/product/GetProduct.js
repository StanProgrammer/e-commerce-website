const productModel = require('../../models/productModel');
const constants = require('../../util/constants');

const GetProduct = async (req, res) => {
  try {
    
    const product = await productModel.find().sort({createdAt:-1})

    res.json({
        message: constants.PRD_GET_SC,
        success: true,
        error:false,
        data: product
    })
   
  } catch (error) {
    res.status(500).json({
      message: constants.PRD_GET_FL,
      error: true,
      success: false
    });
  }
};

module.exports = GetProduct;

const productModel = require('../../models/productModel')
const CategoryWiseProduct = async (req,res) => {
    try {
       const  { category } = req?.body 
       console.log(req.body)
       const product = await productModel.find({ category:category})
       res.json({
        data:product,
        message:"Products of category ",
        success:true,
        error:false
       })
    } catch (error) {
        res.status(500).json({
            message: err.message,
            error: true,
            success: false
          });
    }
}

module.exports = CategoryWiseProduct;
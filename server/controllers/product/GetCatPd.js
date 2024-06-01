const productModel = require('../../models/productModel')
const GetCatPd = async (req,res) => {
    try {
        const productCategory = await productModel.distinct("category")
        const productByCategory = []
        
        for (const category of productCategory){
            const product = await productModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message: "Category",
            data: productByCategory,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message: constants.PRD_DEL_FL,
            error: true,
            success: false
          });
    }
}

module.exports = GetCatPd;
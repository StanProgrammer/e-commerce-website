const constants = require("../../util/constants");

const UserLogOut = (req, res) => {
    try {
      res.clearCookie('token'); 
      res.json({
        message: constants.USR_LG_OUT_SC,
        error: false,
        success: true,
        data: []
      });
    } catch (error) {
      res.status(500).json({
        message: constants.USR_LG_OUT_FL,
        error: true,
        success: false,
        data: [],
        details: error.message
      });
    }
  };
  
  module.exports = UserLogOut;
  
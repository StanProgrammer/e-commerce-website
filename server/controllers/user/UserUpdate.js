const { usrUpdate } = require("../../util/validation");
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const constants = require("../../util/constants");
const UserUpdate = async (req, res) => {
  try {
    const { error, value } = usrUpdate.validate(req.body);
   
    const updateData = value;
    // Validate the request body against the schema
    const user = await userModel.findByIdAndUpdate(updateData.id, updateData, { new: true });
    if (error) {
        console.log(error);
      return res.status(400).json({
        message: error.details[0].message,
        error: true,
        success: false,
      });
    }
   
    res.status(200).json({
      message: constants.USR_UPD_SC,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: constants.USR_CRT_ERR,
      error: true,
      success: false,
    });
  }
};

module.exports = { UserUpdate };

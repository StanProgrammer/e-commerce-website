const userModel = require("../../models/userModel");
const constants = require("../../util/constants");

const UserDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate the user ID
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid user ID",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: constants.USR_DEL_SC, 
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: constants.USR_DEL_ERR, 
      error: true,
      success: false,
    });
  }
};

module.exports = UserDelete ;

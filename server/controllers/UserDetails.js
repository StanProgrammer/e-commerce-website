const userModel = require('../models/userModel');
const constants = require('../util/constants');

const UserDetails = async (req, res) => {
  try {
    
    const userId = req.user.id;
    

    // Fetch the user details from the database
    const user = await userModel.findById(userId).select('-password'); // Exclude the password from the response

    if (!user) {
      return res.status(404).json({
        message: constants.USR_NOT_FOUND,
        error: true,
        success: false
      });
    }

    res.status(200).json({
      message: 'User details retrieved successfully',
      data: user,
      error: false,
      success: true
    });
  } catch (error) {
    // throw new Error(error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = UserDetails;

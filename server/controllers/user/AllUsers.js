const userModel = require('../../models/userModel');
const constants = require('../../util/constants');

const AllUsers = async (req, res) => {
  try {
    // Fetch all user details from the database
    const users = await userModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: constants.USRS_NOT_FOUND,
        error: true,
        success: false
      });
    }

    res.status(200).json({
      message: constants.USRS_DT_SC,
      data: users,
      error: false,
      success: true
    });
  } catch (error) {
    // throw new Error(error);
    res.status(500).json({
      message: 'An error occurred while retrieving user details',
      error: true,
      success: false
    });
  }
};

module.exports = AllUsers;

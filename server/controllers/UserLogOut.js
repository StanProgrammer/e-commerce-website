const UserLogOut = (req, res) => {
    try {
      res.clearCookie('token'); // Corrected method name
      res.json({
        message: "User logged out successfully",
        error: false,
        success: true,
        data: []
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred during logout",
        error: true,
        success: false,
        data: [],
        details: error.message
      });
    }
  };
  
  module.exports = UserLogOut;
  
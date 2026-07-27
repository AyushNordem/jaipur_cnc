const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// Admin Login Controller
exports.adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!email || !password) {
    const error = new Error('Please provide both email and password');
    error.statusCode = 400;
    return next(error);
  }

  if (email === validEmail && password === validPassword) {
    return sendResponse(res, 200, 'Login successful', {
      token: 'jaipur_cnc_admin_session_token_' + Date.now(),
      user: {
        email: validEmail,
        role: 'admin'
      }
    });
  } else {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    return next(error);
  }
});

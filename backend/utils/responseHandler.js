/**
 * Standardized Success Response Utility
 * Outputs uniform response body structure: { status, message, data, success }
 */
const sendResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
    success: statusCode >= 200 && statusCode < 300
  });
};

module.exports = sendResponse;

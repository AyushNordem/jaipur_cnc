/**
 * Centralized Global Error Handler Middleware
 * Outputs uniform error body structure: { status, error, success: false }
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const errorMessage = err.message || 'Internal Server Error';

  console.error(`[API Error] ${req.method} ${req.originalUrl} - Status ${statusCode}:`, errorMessage);

  return res.status(statusCode).json({
    status: statusCode,
    error: errorMessage,
    success: false
  });
};

module.exports = errorHandler;

/**
 * Async Handler Wrapper
 * Catches rejected promises in async route handlers and passes them to next(err)
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

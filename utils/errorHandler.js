const handleValidationError = (error, res) => {

  // Handle duplicate key error 
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    return res.status(409).json({
      status: "error",
      message: `Unique constraint violation: ${field} with value "${value}" already exists.`,
    });
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      status: "error",
      message: "Validation error.",
      errors
    });
  }
  return res.status(500).json({ status: "error", message: error.message });
};

module.exports = { handleValidationError };

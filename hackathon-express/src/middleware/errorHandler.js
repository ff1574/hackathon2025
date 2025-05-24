const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error
  let error = {
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  };

  // Supabase specific errors
  if (err.code && err.details) {
    error.message = "Database error";
    error.details = err.details;
  }

  res.status(error.status).json({
    error: error.message,
    ...(process.env.NODE_ENV === "development" && { details: error.details }),
  });
};

module.exports = errorHandler;

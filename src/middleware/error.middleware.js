import "../../config.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
};

export default errorHandler;

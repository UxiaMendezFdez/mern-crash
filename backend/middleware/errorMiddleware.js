//generic error
const error_handler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const not_fount = (req, res, next) => {
  const error = new Error(`Not Found - ${req.url}`);
  res.status(404);
  next(error);
};

export { error_handler, not_fount };

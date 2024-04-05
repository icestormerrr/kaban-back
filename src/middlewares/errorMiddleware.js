import ApiError from "../exceptions/ApiError.js";

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err?.message });
};

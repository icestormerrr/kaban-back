class ApiError extends Error {
  message;
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static NotFoundError(message) {
    return new ApiError(404, message);
  }

  static BadRequestError(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;

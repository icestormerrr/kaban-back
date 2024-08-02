class HttpError extends Error {
  readonly message: string;
  readonly status: number;
  readonly errors: string[];
  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new HttpError(401, "User is not authorized");
  }

  static NotFoundError(message: string) {
    return new HttpError(404, message);
  }

  static BadRequestError(message: string, errors: string[] = []) {
    return new HttpError(400, message, errors);
  }
}

export default HttpError;

import { Request, Response, NextFunction } from "express";

import HttpError from "../exceptions/HttpError";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err?.message });
};

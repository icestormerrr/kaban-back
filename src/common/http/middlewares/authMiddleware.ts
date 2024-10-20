// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../types/custom-express.d.ts" />

import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import { tokenService } from "../../../domains/token/core/di";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw HttpError.UnauthorizedError();

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) throw HttpError.UnauthorizedError();

    const user = tokenService.invalidateAccessToken(accessToken);
    if (!user) throw HttpError.UnauthorizedError();

    req.user = user ?? undefined;
    next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return next(HttpError.UnauthorizedError());
  }
};

import ApiError from "../exceptions/ApiError.js";
import { tokenService } from "../services/TokenService.js";
// eslint-disable-next-line no-unused-vars
export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw ApiError.UnauthorizedError();

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) throw ApiError.UnauthorizedError();

    const user = tokenService.validateAccessToken(accessToken);
    if (!user) throw ApiError.UnauthorizedError();

    req.user = user;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};

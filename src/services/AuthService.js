import bcrypt from "bcrypt";

import { tokenService } from "../services/TokenService.js";
import { UserModel } from "../models/UserModel.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

class AuthService {
  async register(email, password, name) {
    const isSameEmailUserExist = await UserModel.findOne({ email });
    if (isSameEmailUserExist) {
      throw ApiError.BadRequestError("User with the same email exist!");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, name, password: hashPassword });

    return this.updateTokenForUser(user);
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequestError("User with this email doesn't found");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequestError("Wrong password");
    }

    return this.updateTokenForUser(user);
  }

  async logout(refreshToken) {
    tokenService.deleteToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userDataFromToken = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.getToken(refreshToken);
    if (!userDataFromToken || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userDataFromToken._id);
    return this.updateTokenForUser(user);
  }

  async updateTokenForUser(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.updateToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export const authService = new AuthService();

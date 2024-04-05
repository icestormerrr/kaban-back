import jwt from "jsonwebtoken";

import { TokenModel } from "../models/TokenModel.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async updateToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ userId, refreshToken });
    return token;
  }

  async deleteToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
  }

  async getToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export const tokenService = new TokenService();

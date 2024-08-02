import jwt, { Secret } from "jsonwebtoken";

import { ITokenRepository } from "../repository/ITokenRepository";
import { User } from "../../../user/core/model/User";

export interface ITokenService {
  updateTokenForUser(user: User): Promise<{ accessToken: string; refreshToken: string }>;
  delete(refreshToken: string): Promise<void>;
  invalidateAccessToken(token: string): any | null;
  invalidateRefreshToken(token: string): any | null;
}

export class TokenService implements ITokenService {
  constructor(private tokenRepository: ITokenRepository) {}

  async updateTokenForUser(user: User) {
    const newTokens = this.generateTokens({ ...user });
    const isTokenForUserExist = await this.tokenRepository.getByUserId(user._id);

    if (isTokenForUserExist) {
      await this.tokenRepository.update({ userId: user._id, refreshToken: newTokens.refreshToken });
    } else {
      await this.tokenRepository.create({ userId: user._id, refreshToken: newTokens.refreshToken });
    }

    return newTokens;
  }

  async delete(refreshToken: string) {
    await this.tokenRepository.delete(refreshToken);
  }

  private generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY as Secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY as Secret, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }

  invalidateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY as Secret);
    } catch (err) {
      return null;
    }
  }

  async invalidateRefreshToken(token: string) {
    try {
      const userToken = await this.tokenRepository.getByRefreshTokenValue(token);
      if (!userToken) {
        return null;
      }
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY as Secret);
    } catch (err) {
      return null;
    }
  }
}

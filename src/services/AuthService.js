import bcrypt from "bcrypt";
import { tokenService } from "../services/TokenService.js";
import { UserModel } from "../models/UserModel.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

/**
 * @module Authorization
 */
/**
 * Class for performing user authentication and authorization operations
 */
class AuthService {
  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - Name
   * @returns {Promise<Object>} - User object with updated token
   * @throws {ApiError} - BadRequestError if a user with the same email already exists
   */
  async register(email, password, name) {
    const isSameEmailUserExist = await UserModel.findOne({ email });
    if (isSameEmailUserExist) {
      throw ApiError.BadRequestError("User with the same email exists");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, name, password: hashPassword });
    return this.updateTokenForUser(user);
  }

  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - Name
   * @returns {Promise<Object>} - User object with updated token
   * @throws {ApiError} - BadRequestError if a user with the same email already exists
   */
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequestError("User with this email not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequestError("Wrong password");
    }
    return this.updateTokenForUser(user);
  }

  /**
   * User logout (delete refresh token)
   * @param {string} refreshToken - Refresh token
   */
  async logout(refreshToken) {
    tokenService.deleteToken(refreshToken);
  }

  /**
   * Refresh user's token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} - User object with updated token
   * @throws {ApiError} - UnauthorizedError if refresh token is invalid or not found
   */
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

  /**
   * Update token for the user
   * @param {Object} user - User object
   * @returns {Promise<Object>} - User object with updated token
   */
  async updateTokenForUser(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.updateToken(userDto._id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export const authService = new AuthService();

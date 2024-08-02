import bcrypt from "bcryptjs";

import { User } from "../model/User";
import { IUserRepository } from "../repository/IUserRepository";
import { ITokenService } from "../../../token/core/service/TokenService";

type AuthReturnValue = { user: User; tokens: { accessToken: string; refreshToken: string } };
export interface IUserService {
  register(user: Omit<User, "_id">, errors: string[]): Promise<AuthReturnValue | Partial<AuthReturnValue>>;
  login(user: Omit<User, "_id" | "name">, errors: string[]): Promise<AuthReturnValue | Partial<AuthReturnValue>>;
  refresh(refreshToken: string, errors: string[]): Promise<AuthReturnValue | Partial<AuthReturnValue>>;
  logout(refreshToken: string): Promise<void>;
  getById(userId: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  getByIds(userIds: string[]): Promise<User[]>;
}

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
  ) {}

  async register(user: Omit<User, "_id">, errors: string[]) {
    const { email, password, name } = user;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      errors.push("User with the same email exist!");
      return {};
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const newUser = await this.userRepository.create(new User("", email, name, hashedPassword));
    const tokens = await this.tokenService.updateTokenForUser(newUser);

    return { user: newUser, tokens };
  }

  async login(user: Omit<User, "_id" | "name">, errors: string[]) {
    const { email, password } = user;

    const existingUser = await this.userRepository.findByEmail(email);
    if (!existingUser) {
      errors.push("User with this email doesn't exist");
      return {};
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      errors.push("Wrong password or email ;)");
      return {};
    }

    const tokens = await this.tokenService.updateTokenForUser(existingUser);
    return { user: existingUser, tokens };
  }

  async logout(refreshToken: string) {
    await this.tokenService.delete(refreshToken);
  }

  async refresh(refreshToken: string, errors: string[]) {
    const userDataFromToken = await this.tokenService.invalidateRefreshToken(refreshToken);
    if (!userDataFromToken) {
      errors.push("Cannot invalidate the token");
      return {};
    }

    const user = await this.userRepository.findById(userDataFromToken._id);
    if (!user) {
      errors.push("Cannot invalidate the token");
      return {};
    }
    const tokens = await this.tokenService.updateTokenForUser(user);

    return { user, tokens };
  }

  async getById(userId: string) {
    return await this.userRepository.findById(userId);
  }

  async getByIds(usersIds: string[]) {
    return await this.userRepository.findByIds(usersIds);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }
}

import { UserToken } from "../model/UserToken";

export interface ITokenRepository {
  getByUserId(userId: string): Promise<UserToken | null>;
  getByRefreshTokenValue(refreshToken: string): Promise<UserToken | null>;
  create(userToken: UserToken): Promise<UserToken>;
  update(userToken: UserToken): Promise<UserToken | null>;
  delete(refreshToken: string): Promise<boolean>;
}

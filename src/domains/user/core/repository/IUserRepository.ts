import { User } from "../model/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByIds(ids: string[]): Promise<User[]>;
  create(user: User): Promise<User>;
  deleteById(id: string): Promise<boolean>;
}

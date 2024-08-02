import { User } from "../../../../core/model/User";

export class UserWithoutPasswordDto {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
  }
}

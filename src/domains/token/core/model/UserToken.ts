export class UserToken {
  constructor(
    readonly userId: string,
    readonly refreshToken: string,
  ) {}
}

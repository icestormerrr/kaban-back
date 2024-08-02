export class MongoUserToken {
  constructor(
    readonly userId: string,
    readonly refreshToken: string,
  ) {}
}

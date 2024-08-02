export class MongoUser {
  constructor(
    readonly _id: string,
    readonly email: string,
    readonly name: string,
    readonly password: string,
  ) {}
}

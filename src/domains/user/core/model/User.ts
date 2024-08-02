export class User {
  constructor(
    public readonly _id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}
}

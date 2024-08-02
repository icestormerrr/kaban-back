export class Message {
  constructor(
    readonly _id: string,
    readonly description: string,
    readonly date: number,
    readonly userId: string,
  ) {}
}

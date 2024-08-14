export class Message {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly date: number,
    readonly userId: string,
  ) {}
}

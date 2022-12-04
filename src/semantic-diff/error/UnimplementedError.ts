export default class UnimplementedError extends Error {
  constructor() {
    super();
    this.message = "Not implemented";
    this.name = "UnimplementedError";
  }
}
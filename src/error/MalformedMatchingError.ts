export default class MalformedMatchingError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'MalformedMatchingError';
  }
}
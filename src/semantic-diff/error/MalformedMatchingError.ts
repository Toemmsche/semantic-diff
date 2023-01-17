export default class MalformedMatchingError extends Error {
  constructor(message: string = 'Malformed Matching') {
    super();
    this.message = message;
    this.name = 'MalformedMatchingError';
  }
}

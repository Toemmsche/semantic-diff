export default class MalformedGrammarError extends Error {
  constructor(message: string = "Malformed Grammar") {
    super();
    this.message =message;
    this.name = "Malformed Grammar";
  }
}

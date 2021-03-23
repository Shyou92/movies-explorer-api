class MongoValidationError extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.status = 409;
  }
}

module.exports = MongoValidationError;

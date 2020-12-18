"use strict";
class PartyError extends Error {
  constructor(message, code, name) {
    super();
    this.message = message;
    this.code = code;
    this.name = name;
  }
}
class FatalError extends PartyError {
  constructor(message, code) {
    super(message, code, "FatalPartyError");
  }
}

class ObjectNotFoundError extends PartyError {
  constructor(message, code) {
    super(message, code, "ObjectNotFoundError");
  }
}

class InvalidAuthorizationTokenError extends PartyError {
  constructor(message, code) {
    super(message, code, "InvalidAuthorizationTokenError");
  }
}

class EntityAlreadyExistsError extends PartyError {
  constructor(message, code) {
    super(message, code, "EntityAlreadyExists");
  }
}

class InvalidEntityError extends PartyError {
  constructor(message, code) {
    super(message, code, "InvalidEntityError");
  }
}
global.PartyError = PartyError;
global.FatalError = FatalError;
global.ObjectNotFoundError = ObjectNotFoundError;
global.InvalidAuthorizationTokenError = InvalidAuthorizationTokenError;
global.EntityAlreadyExistsError = EntityAlreadyExistsError;
global.InvalidEntityError = InvalidEntityError;

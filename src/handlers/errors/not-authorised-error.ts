import { AuthError } from "./abstract/auth-error.ts";

class NotAuthorisedError extends AuthError {
  statusCode = 401;

  constructor() {
    super("Not authorised");

    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  mapErrors() {
    return {
      errors: [
        {
          message: "Not authorised",
        },
      ],
    };
  }
}

export { NotAuthorisedError };

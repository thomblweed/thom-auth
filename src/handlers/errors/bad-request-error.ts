import { AuthError } from "./abstract/auth-error.ts";

class BadRequestError extends AuthError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  mapErrors() {
    return {
      errors: [
        {
          message: this.message,
        },
      ],
    };
  }
}

export { BadRequestError };

abstract class AuthError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  abstract mapErrors(): {
    errors: {
      param?: string;
      value?: string;
      message: string;
    }[];
  };
}

export { AuthError };

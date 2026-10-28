export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }

  static badRequest(message = 'Bad Request', details?: unknown) {
    return new HttpError(400, message, details);
  }

  static notFound(message = 'Not Found') {
    return new HttpError(404, message);
  }

  static tooManyRequests(message = 'Too Many Requests') {
    return new HttpError(429, message);
  }

  static serviceUnavailable(message = 'Service Unavailable') {
    return new HttpError(503, message);
  }
}

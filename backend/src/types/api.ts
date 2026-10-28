/** Shape of every successful response body. */
export interface ApiSuccess<T> {
  data: T;
}

/** Shape of every error response body. */
export interface ApiErrorBody {
  error: {
    message: string;
    details?: unknown;
  };
}

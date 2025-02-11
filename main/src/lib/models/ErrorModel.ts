// lib/models/ErrorModel.ts
export class HttpError extends Error {
    code: number;
    constructor(message: string, errorCode: number) {
      super(message);
      this.code = errorCode;
    }
  }
  
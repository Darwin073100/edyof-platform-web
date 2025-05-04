export class ErrorEntity {
  constructor(
    public error: string,
    public message: string,
    public statusCode: number,
  ) {}
} 
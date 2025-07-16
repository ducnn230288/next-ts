export class AppError extends Error {
  constructor(message: string, name?: Record<string, unknown>) {
    super(message);
    this.name = JSON.stringify(name || {});
  }
}

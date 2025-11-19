export class ScanError extends Error {
  scope: "config" | "fs" | "ts" | "analysis";

  constructor(scope: ScanError["scope"], message: string) {
    super(message);
    this.scope = scope;
  }
}

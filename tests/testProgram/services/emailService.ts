import { logInfo } from "../utils/logger";

export class EmailService {
  sendWelcomeEmail(address: string) {
    logInfo(`Sending welcome email to ${address}`);
  }
}

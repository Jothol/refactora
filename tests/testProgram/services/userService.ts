import { logInfo } from "../utils/logger";
import { EmailService } from "./emailService";

export class UserService {
  private email: EmailService;

  constructor() {
    this.email = new EmailService();
  }

  async fetchUser(id: number) {
    logInfo(`Fetching user with id: ${id}`);

    // Fake async delay to simulate I/O
    await new Promise((res) => setTimeout(res, 50));

    const user = { id, name: "Alice", email: "alice@example.com" };

    this.email.sendWelcomeEmail(user.email);

    return user;
  }
}

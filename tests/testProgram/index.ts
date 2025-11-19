import { Calculator } from "./math/calculator";
import { greetUser } from "./utils/strings";
import { logInfo } from "./utils/logger";
import { UserService } from "./services/userService";

async function main() {
  logInfo("Program starting...");

  const calc = new Calculator();
  const sum = calc.add(5, 7);
  const product = calc.multiply(3, 4);

  const msg = greetUser("Jon");
  logInfo(msg);

  const userService = new UserService();
  const user = await userService.fetchUser(1);

  logInfo(`Sum: ${sum}, Product: ${product}`);
  logInfo(`Fetched user: ${JSON.stringify(user)}`);
}

main();

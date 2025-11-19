import { add } from "./add";
import { multiply } from "./multiply";

export class Calculator {
  add(a: number, b: number) {
    return add(a, b);
  }

  multiply(a: number, b: number) {
    return multiply(a, b);
  }
}

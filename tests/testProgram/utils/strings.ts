export function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function requireScope(userScopes: string[], required: string) {
  if (!userScopes.includes(required)) {
    throw new Error("FORBIDDEN");
  }
}
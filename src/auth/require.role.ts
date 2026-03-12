export function requireRole(userRoles: string[], requiredRole: string) {
  if (!userRoles || !userRoles.includes(requiredRole)) {
    throw new Error("FORBIDDEN");
  }
}
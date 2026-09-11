export default function getTranslatedRole(role: string) {
  const roles: any = {
    admin: "admin",
    handwerker: "handwerker",
    client: "kunde",
  };
  if (!role) return undefined;
  return roles[role];
}

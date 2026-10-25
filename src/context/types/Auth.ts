export enum Roles {
  Support = "Support",
  Admin = "Administrator",
}
export const RolePermissions: { [key in Roles]: string[] } = {
  [Roles.Admin]: ["read:profile", "write:profile"],
  [Roles.Support]: ["read:profile", "write:profile", "delete:profile"],
};
export interface IRegisterUser {
  id: number;
  Username: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  role: Roles;
}
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: Roles;
}
export interface ILogin {
  Username: string;
  Password: string;
}
export interface ITokenData {
  email: string;
  id: string;
  role: string;
  exp: number;
}
export interface User {
  id: string;
  email: string;
  username: string;
  role: Roles.Support | Roles.Admin;
}

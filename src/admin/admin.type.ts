export type AdminRole = 'ADMIN';

export interface AdminType {
  id: number;
  email: string;
  passwordHash: string;
  role?: AdminRole;
}
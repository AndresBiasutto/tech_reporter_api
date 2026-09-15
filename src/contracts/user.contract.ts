import { AccountType, User } from '../models';

export interface SessionResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: AccountType;
  roleId: string | null;
}

export function toSessionResponse(user: User, roleId: string | null): SessionResponse {
  return {
    id: user.id_user,
    name: user.name,
    email: user.e_mail,
    phone: user.phone,
    accountType: user.account_type,
    roleId
  };
}

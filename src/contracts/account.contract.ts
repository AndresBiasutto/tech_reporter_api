import { AccountType, User } from '../models';

export interface AccountResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: AccountType;
  roleId: string;
  clientId?: string;
}

export function toAccountResponse(
  user: User,
  roleId: string,
  clientId?: string
): AccountResponse {
  return {
    id: user.id_user,
    name: user.name,
    email: user.e_mail,
    phone: user.phone,
    accountType: user.account_type,
    roleId,
    ...(clientId ? { clientId } : {})
  };
}

import { Client } from '../models';

export interface ClientResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  roleId: string;
}

export function toClientResponse(client: Client): ClientResponse {
  const user = client.user;
  if (!user) throw new Error('Client response requires its user profile');
  return {
    id: client.id_client,
    name: user.name,
    email: user.e_mail,
    phone: user.phone,
    companyId: client.id_company,
    roleId: client.id_role
  };
}

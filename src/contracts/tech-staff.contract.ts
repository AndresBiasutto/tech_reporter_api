import { TechStaff } from '../models';

export interface TechStaffResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  clientId: string;
  roleId: string;
}

export function toTechStaffResponse(techStaff: TechStaff): TechStaffResponse {
  const user = techStaff.user;
  if (!user) throw new Error('Tech staff response requires its user profile');
  return {
    id: techStaff.id_tech_staff,
    name: user.name,
    email: user.e_mail,
    phone: user.phone,
    clientId: techStaff.id_client,
    roleId: techStaff.id_role
  };
}

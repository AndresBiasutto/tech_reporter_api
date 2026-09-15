import { Role } from '../models';

export interface RoleResponse {
  id: string;
  name: string;
}

export function toRoleResponse(role: Role): RoleResponse {
  return { id: role.id_role, name: role.name };
}

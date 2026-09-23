import { Request, Response } from 'express';
import { toRoleResponse } from '../contracts/role.contract';
import { RoleService } from '../services/role.service';

const roles = new RoleService();

export async function getRole(request: Request, response: Response): Promise<void> {
  const role = await roles.get(request.params.id);
  response.status(200).json({ role: toRoleResponse(role) });
}

export async function listRoles(_request: Request, response: Response): Promise<void> {
  const result = await roles.list();
  response.status(200).json({ roles: result.map(toRoleResponse) });
}

export async function createRole(request: Request, response: Response): Promise<void> {
  const role = await roles.create((request.body as { name: string }).name);
  response.status(201).json({ role: toRoleResponse(role) });
}

export async function updateRole(request: Request, response: Response): Promise<void> {
  const role = await roles.update(request.params.id, (request.body as { name: string }).name);
  response.status(200).json({ role: toRoleResponse(role) });
}

export async function deleteRole(request: Request, response: Response): Promise<void> {
  await roles.delete(request.params.id);
  response.status(204).send();
}

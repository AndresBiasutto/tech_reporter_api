import { Request, Response } from 'express';
import { toAccountResponse } from '../contracts/account.contract';
import { CompanyAccountService } from '../services/company-account.service';

const companyAccounts = new CompanyAccountService();

export async function createClient(request: Request, response: Response): Promise<void> {
  const { name, email, phone, password, roleId } = request.body as Record<string, string>;
  const account = await companyAccounts.createClient(request.auth!.userId, { name, email, phone, password, roleId });
  response.status(201).json({ user: toAccountResponse(account.user, account.roleId) });
}
export async function updateClient(request: Request, response: Response): Promise<void> {
  const { name, email, phone } = request.body as Record<string, string | undefined>;

  const account = await companyAccounts.updateClient(
    request.auth!.userId,
    request.auth!.accountType,
    request.params.id,
    { name, email, phone }
  );

  response.status(200).json({
    user: toAccountResponse(account.user, account.roleId)
  });
}
export async function createTechStaff(request: Request, response: Response): Promise<void> {
  const { name, email, phone, password, roleId, clientId } = request.body as Record<string, string>;
  const account = await companyAccounts.createTechStaff({ name, email, phone, password, roleId, clientId });
  response.status(201).json({ user: toAccountResponse(account.user, account.roleId, account.clientId) });
}

export async function assignClientRole(request: Request, response: Response): Promise<void> {
  await companyAccounts.assignClientRole(request.params.id, (request.body as { roleId: string }).roleId);
  response.status(204).send();
}

export async function assignTechStaffRole(request: Request, response: Response): Promise<void> {
  await companyAccounts.assignTechStaffRole(request.params.id, (request.body as { roleId: string }).roleId);
  response.status(204).send();
}

export async function deleteClient(request: Request, response: Response): Promise<void> {
  await companyAccounts.deleteClient(request.params.id);
  response.status(204).send();
}

export async function deleteTechStaff(request: Request, response: Response): Promise<void> {
  await companyAccounts.deleteTechStaff(request.params.id);
  response.status(204).send();
}

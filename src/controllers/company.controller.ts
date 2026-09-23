import { Request, Response } from 'express';
import { toCompanyResponse } from '../contracts/company.contract';
import { CompanyService } from '../services/company.service';

const companies = new CompanyService();

export async function getCompany(request: Request, response: Response): Promise<void> {
  const company = await companies.getOwnCompany(request.auth!.userId, request.params.id);
  response.status(200).json({ company: toCompanyResponse(company) });
}

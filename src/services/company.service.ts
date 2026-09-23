import { Company } from '../models';
import { CompanyRepository } from '../repositories/company.repository';
import { ForbiddenError, NotFoundError } from '../utils/errors';

export class CompanyService {
  private readonly companies = new CompanyRepository();

  async getOwnCompany(authenticatedCompanyId: string, companyId: string): Promise<Company> {
    if (authenticatedCompanyId !== companyId) throw new ForbiddenError('You can only view your own company');
    const company = await this.companies.findWithUserById(companyId);
    if (!company) throw new NotFoundError('Company not found');
    return company;
  }
}

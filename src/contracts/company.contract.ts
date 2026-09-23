import { Company } from '../models';

export interface CompanyResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function toCompanyResponse(company: Company): CompanyResponse {
  const user = company.user;
  if (!user) throw new Error('Company response requires its user profile');
  return { id: company.id_company, name: user.name, email: user.e_mail, phone: user.phone };
}

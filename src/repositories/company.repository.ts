import { Company, User } from '../models';

export class CompanyRepository {
  findWithUserById(id: string): Promise<Company | null> {
    return Company.findByPk(id, { include: [{ model: User, as: 'user' }] });
  }
}

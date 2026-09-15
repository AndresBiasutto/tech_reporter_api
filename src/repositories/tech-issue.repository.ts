import { Transaction } from 'sequelize';
import { TechIssue } from '../models';

export class TechIssueRepository {
  findAllByClientId(clientId: string, transaction?: Transaction): Promise<TechIssue[]> {
    return TechIssue.findAll({ where: { id_client: clientId }, transaction });
  }

  destroyByClientId(clientId: string, transaction?: Transaction): Promise<number> {
    return TechIssue.destroy({ where: { id_client: clientId }, transaction });
  }
}

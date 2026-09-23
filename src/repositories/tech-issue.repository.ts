import { Transaction } from 'sequelize';
import { Client, TechIssue } from '../models';

export class TechIssueRepository {
  findById(id: string, transaction?: Transaction): Promise<TechIssue | null> {
    return TechIssue.findByPk(id, { transaction });
  }

  findWithClientById(id: string): Promise<TechIssue | null> {
    return TechIssue.findByPk(id, { include: [{ model: Client, as: 'client', required: true }] });
  }

  findAllByCompanyId(companyId: string): Promise<TechIssue[]> {
    return TechIssue.findAll({
      include: [{ model: Client, as: 'client', required: true, where: { id_company: companyId } }],
      order: [['id_tech_issue', 'ASC']]
    });
  }
  findAllByClientId(clientId: string, transaction?: Transaction): Promise<TechIssue[]> {
    return TechIssue.findAll({ where: { id_client: clientId }, transaction });
  }

  create(
    data: { where_to_go: string | null; urgency_level: string; issue_description: string; issue_status: string; id_client: string },
    transaction?: Transaction
  ): Promise<TechIssue> {
    return TechIssue.create(data, { transaction });
  }

  destroyByClientId(clientId: string, transaction?: Transaction): Promise<number> {
    return TechIssue.destroy({ where: { id_client: clientId }, transaction });
  }
}

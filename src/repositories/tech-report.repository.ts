import { Op, Transaction } from 'sequelize';
import { Client, TechIssue, TechReport, TechStaff, User } from '../models';

export class TechReportRepository {
  private readonly detailIncludes = [
    {
      model: TechIssue,
      as: 'techIssue',
      required: true,
      include: [{ model: Client, as: 'client', required: true }]
    },
    { model: TechStaff, as: 'techStaffMember', required: true, include: [{ model: User, as: 'user' }] }
  ];

  findAllWithDetailsByCompanyId(companyId: string): Promise<TechReport[]> {
    return TechReport.findAll({
      include: [
        {
          model: TechIssue,
          as: 'techIssue',
          required: true,
          include: [{ model: Client, as: 'client', required: true, where: { id_company: companyId } }]
        },
        { model: TechStaff, as: 'techStaffMember', required: true, include: [{ model: User, as: 'user' }] }
      ],
      order: [['date_start', 'DESC']]
    });
  }

  findAllWithDetailsByClientId(clientId: string): Promise<TechReport[]> {
    return TechReport.findAll({
      include: [
        {
          model: TechIssue,
          as: 'techIssue',
          required: true,
          where: { id_client: clientId },
          include: [{ model: Client, as: 'client', required: true }]
        },
        { model: TechStaff, as: 'techStaffMember', required: true, include: [{ model: User, as: 'user' }] }
      ],
      order: [['date_start', 'DESC']]
    });
  }

  findAllWithDetailsByTechStaffId(techStaffId: string): Promise<TechReport[]> {
    return TechReport.findAll({
      where: { id_tech_staff: techStaffId },
      include: this.detailIncludes,
      order: [['date_start', 'DESC']]
    });
  }

  findWithDetailsById(id: string, transaction?: Transaction): Promise<TechReport | null> {
    return TechReport.findByPk(id, { include: this.detailIncludes, transaction });
  }

  create(
    data: { tech_solution: string | null; date_start: Date; date_end: Date | null; id_tech_staff: string; id_tech_issue: string },
    transaction?: Transaction
  ): Promise<TechReport> {
    return TechReport.create(data, { transaction });
  }
  destroyByTechStaffId(techStaffId: string, transaction?: Transaction): Promise<number> {
    return TechReport.destroy({ where: { id_tech_staff: techStaffId }, transaction });
  }

  destroyByIssueIds(issueIds: string[], transaction?: Transaction): Promise<number> {
    if (issueIds.length === 0) return Promise.resolve(0);
    return TechReport.destroy({ where: { id_tech_issue: { [Op.in]: issueIds } }, transaction });
  }
}

import { Op, Transaction } from 'sequelize';
import { TechReport } from '../models';

export class TechReportRepository {
  destroyByTechStaffId(techStaffId: string, transaction?: Transaction): Promise<number> {
    return TechReport.destroy({ where: { id_tech_staff: techStaffId }, transaction });
  }

  destroyByIssueIds(issueIds: string[], transaction?: Transaction): Promise<number> {
    if (issueIds.length === 0) return Promise.resolve(0);
    return TechReport.destroy({ where: { id_tech_issue: { [Op.in]: issueIds } }, transaction });
  }
}

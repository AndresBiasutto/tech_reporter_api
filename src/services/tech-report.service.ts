import { TechReport } from '../models';
import { TechIssueRepository } from '../repositories/tech-issue.repository';
import { TechReportRepository } from '../repositories/tech-report.repository';
import { TechStaffRepository } from '../repositories/tech-staff.repository';
import { ForbiddenError, NotFoundError } from '../utils/errors';

export interface CreateTechReportData {
  techIssueId: string;
  solution?: string;
  dateStart: string;
  dateEnd?: string;
}

export class TechReportService {
  private readonly techStaff = new TechStaffRepository();
  private readonly issues = new TechIssueRepository();
  private readonly reports = new TechReportRepository();

  async createForTechStaff(techStaffId: string, data: CreateTechReportData): Promise<TechReport> {
    const [techStaff, issue] = await Promise.all([
      this.techStaff.findById(techStaffId),
      this.issues.findById(data.techIssueId)
    ]);
    if (!techStaff) throw new NotFoundError('Tech staff profile not found');
    if (!issue) throw new NotFoundError('Tech issue not found');
    if (issue.id_client !== techStaff.id_client) {
      throw new ForbiddenError('You can only report on issues from your assigned client');
    }

    const report = await this.reports.create({
      tech_solution: data.solution ?? null,
      date_start: new Date(data.dateStart),
      date_end: data.dateEnd ? new Date(data.dateEnd) : null,
      id_tech_staff: techStaff.id_tech_staff,
      id_tech_issue: issue.id_tech_issue
    });
    const detailedReport = await this.reports.findWithDetailsById(report.id_tech_report);
    if (!detailedReport) throw new NotFoundError('Created tech report not found');
    return detailedReport;
  }
}

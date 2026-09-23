import { TechReport } from '../models';
import { TechIssueResponse, toTechIssueResponse } from './tech-issue.contract';

export interface TechReportResponse {
  id: string;
  solution: string | null;
  dateStart: string;
  dateEnd: string | null;
  techStaffId: string;
  techIssueId: string;
  techIssue: TechIssueResponse;
}

export function toTechReportResponse(report: TechReport): TechReportResponse {
  if (!report.techIssue) throw new Error('Tech report response requires its tech issue');
  return {
    id: report.id_tech_report,
    solution: report.tech_solution,
    dateStart: report.date_start.toISOString(),
    dateEnd: report.date_end?.toISOString() ?? null,
    techStaffId: report.id_tech_staff,
    techIssueId: report.id_tech_issue,
    techIssue: toTechIssueResponse(report.techIssue)
  };
}

import { Request, Response } from 'express';
import { toTechReportResponse } from '../contracts/tech-report.contract';
import { TechReportService } from '../services/tech-report.service';

const techReports = new TechReportService();

export async function createTechReport(request: Request, response: Response): Promise<void> {
  const { techIssueId, solution, dateStart, dateEnd } = request.body as Record<string, string | undefined>;
  const report = await techReports.createForTechStaff(request.auth!.userId, {
    techIssueId: techIssueId!,
    solution,
    dateStart: dateStart!,
    dateEnd
  });
  response.status(201).json({ techReport: toTechReportResponse(report) });
}

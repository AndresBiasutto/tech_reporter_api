import { Request, Response } from 'express';
import { toClientResponse } from '../contracts/client.contract';
import { toTechIssueResponse } from '../contracts/tech-issue.contract';
import { toTechReportResponse } from '../contracts/tech-report.contract';
import { toTechStaffResponse } from '../contracts/tech-staff.contract';
import { VisibilityService } from '../services/visibility.service';

const visibility = new VisibilityService();

export async function getClientById(request: Request, response: Response): Promise<void> {
  const client = await visibility.getVisibleClient(request.auth!.accountType, request.auth!.userId, request.params.id);
  response.status(200).json({ client: toClientResponse(client) });
}

export async function getTechStaffById(request: Request, response: Response): Promise<void> {
  const techStaff = await visibility.getVisibleTechStaff(request.auth!.accountType, request.auth!.userId, request.params.id);
  response.status(200).json({ techStaff: toTechStaffResponse(techStaff) });
}

export async function getTechIssueById(request: Request, response: Response): Promise<void> {
  const issue = await visibility.getVisibleIssue(request.auth!.accountType, request.auth!.userId, request.params.id);
  response.status(200).json({ techIssue: toTechIssueResponse(issue) });
}

export async function getTechReportById(request: Request, response: Response): Promise<void> {
  const report = await visibility.getVisibleReport(request.auth!.accountType, request.auth!.userId, request.params.id);
  response.status(200).json({ techReport: toTechReportResponse(report) });
}

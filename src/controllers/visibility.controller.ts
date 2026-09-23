import { Request, Response } from 'express';
import { toClientResponse } from '../contracts/client.contract';
import { toTechIssueResponse } from '../contracts/tech-issue.contract';
import { toTechReportResponse } from '../contracts/tech-report.contract';
import { toTechStaffResponse } from '../contracts/tech-staff.contract';
import { VisibilityService } from '../services/visibility.service';

const visibility = new VisibilityService();

export async function listClients(request: Request, response: Response): Promise<void> {
  const clients = await visibility.listCompanyClients(request.auth!.userId);
  response.status(200).json({ clients: clients.map(toClientResponse) });
}

export async function listTechStaff(request: Request, response: Response): Promise<void> {
  const techStaff = await visibility.listVisibleTechStaff(request.auth!.accountType, request.auth!.userId);
  response.status(200).json({ techStaff: techStaff.map(toTechStaffResponse) });
}

export async function listTechIssues(request: Request, response: Response): Promise<void> {
  const issues = await visibility.listVisibleIssues(request.auth!.accountType, request.auth!.userId);
  response.status(200).json({ techIssues: issues.map(toTechIssueResponse) });
}

export async function listTechReports(request: Request, response: Response): Promise<void> {
  const reports = await visibility.listVisibleReports(request.auth!.accountType, request.auth!.userId);
  response.status(200).json({ techReports: reports.map(toTechReportResponse) });
}

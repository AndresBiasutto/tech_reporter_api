import { AccountType, Client, TechIssue, TechReport, TechStaff } from '../models';
import { ClientRepository } from '../repositories/client.repository';
import { TechIssueRepository } from '../repositories/tech-issue.repository';
import { TechReportRepository } from '../repositories/tech-report.repository';
import { TechStaffRepository } from '../repositories/tech-staff.repository';
import { ForbiddenError, NotFoundError } from '../utils/errors';

export class VisibilityService {
  private readonly clients = new ClientRepository();
  private readonly techStaff = new TechStaffRepository();
  private readonly issues = new TechIssueRepository();
  private readonly reports = new TechReportRepository();

  listCompanyClients(companyId: string): Promise<Client[]> {
    return this.clients.findAllByCompanyId(companyId);
  }

  listCompanyTechStaff(companyId: string): Promise<TechStaff[]> {
    return this.techStaff.findAllWithDetailsByCompanyId(companyId);
  }

  listCompanyIssues(companyId: string): Promise<TechIssue[]> {
    return this.issues.findAllByCompanyId(companyId);
  }

  listCompanyReports(companyId: string): Promise<TechReport[]> {
    return this.reports.findAllWithDetailsByCompanyId(companyId);
  }

  listVisibleTechStaff(accountType: AccountType, userId: string): Promise<TechStaff[]> {
    if (accountType === 'company') return this.listCompanyTechStaff(userId);
    if (accountType === 'client') return this.listClientTechStaff(userId);
    throw new ForbiddenError('Tech staff accounts cannot list assigned staff');
  }

  listVisibleIssues(accountType: AccountType, userId: string): Promise<TechIssue[]> {
    if (accountType === 'company') return this.listCompanyIssues(userId);
    if (accountType === 'client') return this.listClientIssues(userId);
    return this.listTechStaffIssues(userId);
  }

  listVisibleReports(accountType: AccountType, userId: string): Promise<TechReport[]> {
    if (accountType === 'company') return this.listCompanyReports(userId);
    if (accountType === 'client') return this.listClientReports(userId);
    return this.listTechStaffReports(userId);
  }

  async getVisibleClient(accountType: AccountType, userId: string, clientId: string): Promise<Client> {
    const client = await this.clients.findWithDetailsById(clientId);
    if (!client) throw new NotFoundError('Client not found');
    if ((accountType === 'company' && client.id_company === userId) || (accountType === 'client' && client.id_client === userId)) {
      return client;
    }
    throw new ForbiddenError('You cannot view this client');
  }

  async getVisibleTechStaff(accountType: AccountType, userId: string, techStaffId: string): Promise<TechStaff> {
    const techStaff = await this.techStaff.findWithDetailsById(techStaffId);
    if (!techStaff) throw new NotFoundError('Tech staff member not found');
    const client = techStaff.client;
    if (!client) throw new NotFoundError('Tech staff client not found');
    const canView =
      (accountType === 'company' && client.id_company === userId) ||
      (accountType === 'client' && techStaff.id_client === userId) ||
      (accountType === 'tech_staff' && techStaff.id_tech_staff === userId);
    if (!canView) throw new ForbiddenError('You cannot view this tech staff member');
    return techStaff;
  }

  async getVisibleIssue(accountType: AccountType, userId: string, issueId: string): Promise<TechIssue> {
    const issue = await this.issues.findWithClientById(issueId);
    if (!issue) throw new NotFoundError('Tech issue not found');
    const client = issue.client;
    if (!client) throw new NotFoundError('Issue client not found');
    const canView =
      (accountType === 'company' && client.id_company === userId) ||
      (accountType === 'client' && issue.id_client === userId) ||
      (accountType === 'tech_staff' && (await this.requireTechStaff(userId)).id_client === issue.id_client);
    if (!canView) throw new ForbiddenError('You cannot view this tech issue');
    return issue;
  }

  async getVisibleReport(accountType: AccountType, userId: string, reportId: string): Promise<TechReport> {
    const report = await this.reports.findWithDetailsById(reportId);
    if (!report) throw new NotFoundError('Tech report not found');
    const client = report.techIssue?.client;
    if (!client) throw new NotFoundError('Report client not found');
    const canView =
      (accountType === 'company' && client.id_company === userId) ||
      (accountType === 'client' && report.techIssue!.id_client === userId) ||
      (accountType === 'tech_staff' && report.id_tech_staff === userId);
    if (!canView) throw new ForbiddenError('You cannot view this tech report');
    return report;
  }

  async listClientTechStaff(clientId: string): Promise<TechStaff[]> {
    await this.requireClient(clientId);
    return this.techStaff.findAllWithDetailsByClientId(clientId);
  }

  async listClientIssues(clientId: string): Promise<TechIssue[]> {
    await this.requireClient(clientId);
    return this.issues.findAllByClientId(clientId);
  }

  async listClientReports(clientId: string): Promise<TechReport[]> {
    await this.requireClient(clientId);
    return this.reports.findAllWithDetailsByClientId(clientId);
  }

  async listTechStaffIssues(techStaffId: string): Promise<TechIssue[]> {
    const techStaff = await this.requireTechStaff(techStaffId);
    return this.issues.findAllByClientId(techStaff.id_client);
  }

  async listTechStaffReports(techStaffId: string): Promise<TechReport[]> {
    await this.requireTechStaff(techStaffId);
    return this.reports.findAllWithDetailsByTechStaffId(techStaffId);
  }

  private async requireClient(id: string): Promise<Client> {
    const client = await this.clients.findById(id);
    if (!client) throw new NotFoundError('Client profile not found');
    return client;
  }

  private async requireTechStaff(id: string): Promise<TechStaff> {
    const techStaff = await this.techStaff.findById(id);
    if (!techStaff) throw new NotFoundError('Tech staff profile not found');
    return techStaff;
  }
}

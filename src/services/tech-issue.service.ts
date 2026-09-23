import { TechIssue } from '../models';
import { TechIssueRepository } from '../repositories/tech-issue.repository';

export interface CreateTechIssueData {
  whereToGo?: string;
  urgencyLevel: string;
  description: string;
  status: string;
}

export class TechIssueService {
  private readonly issues = new TechIssueRepository();

  createForClient(clientId: string, data: CreateTechIssueData): Promise<TechIssue> {
    return this.issues.create({
      where_to_go: data.whereToGo ?? null,
      urgency_level: data.urgencyLevel,
      issue_description: data.description,
      issue_status: data.status,
      id_client: clientId
    });
  }
}

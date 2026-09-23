import { TechIssue } from '../models';

export interface TechIssueResponse {
  id: string;
  whereToGo: string | null;
  urgencyLevel: string;
  description: string;
  status: string;
  clientId: string;
}

export function toTechIssueResponse(issue: TechIssue): TechIssueResponse {
  return {
    id: issue.id_tech_issue,
    whereToGo: issue.where_to_go,
    urgencyLevel: issue.urgency_level,
    description: issue.issue_description,
    status: issue.issue_status,
    clientId: issue.id_client
  };
}

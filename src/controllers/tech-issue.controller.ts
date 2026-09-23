import { Request, Response } from 'express';
import { toTechIssueResponse } from '../contracts/tech-issue.contract';
import { TechIssueService } from '../services/tech-issue.service';

const techIssues = new TechIssueService();

export async function createTechIssue(request: Request, response: Response): Promise<void> {
  const { whereToGo, urgencyLevel, description, status } = request.body as Record<string, string | undefined>;
  const issue = await techIssues.createForClient(request.auth!.userId, { whereToGo, urgencyLevel: urgencyLevel!, description: description!, status: status! });
  response.status(201).json({ techIssue: toTechIssueResponse(issue) });
}

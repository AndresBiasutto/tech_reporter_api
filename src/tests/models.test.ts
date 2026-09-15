import { Client, Company, Role, TechIssue, TechReport, TechStaff } from '../models';
import '../config/database';

describe('Sequelize model definitions', () => {
  it('declares the expected primary keys and credential constraints', () => {
    expect(Company.getAttributes().id_company.primaryKey).toBe(true);
    expect(Client.getAttributes().id_client.primaryKey).toBe(true);
    expect(TechStaff.getAttributes().id_tech_staff.primaryKey).toBe(true);
    expect(Company.getAttributes().e_mail.unique).toBe(true);
    expect(Client.getAttributes().e_mail.unique).toBe(true);
    expect(TechStaff.getAttributes().e_mail.unique).toBe(true);
  });

  it('keeps only the approved fields nullable', () => {
    expect(TechIssue.getAttributes().where_to_go.allowNull).toBe(true);
    expect(TechReport.getAttributes().tech_solution.allowNull).toBe(true);
    expect(TechReport.getAttributes().date_end.allowNull).toBe(true);
    expect(TechReport.getAttributes().date_start.allowNull).toBe(false);
  });

  it('registers every relationship from the domain model', () => {
    expect(Company.associations.clients.target).toBe(Client);
    expect(Role.associations.clients.target).toBe(Client);
    expect(Role.associations.techStaffMembers.target).toBe(TechStaff);
    expect(Client.associations.techIssues.target).toBe(TechIssue);
    expect(TechStaff.associations.techReports.target).toBe(TechReport);
    expect(TechIssue.associations.techReports.target).toBe(TechReport);
  });
});

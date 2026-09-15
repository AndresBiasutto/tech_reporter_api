import { Client, Company, Role, TechIssue, TechReport, TechStaff, User } from '../models';
import '../config/database';

describe('Sequelize model definitions', () => {
  it('declares UUID primary keys and keeps credentials only in User', () => {
    expect(Company.getAttributes().id_company.primaryKey).toBe(true);
    expect(Client.getAttributes().id_client.primaryKey).toBe(true);
    expect(TechStaff.getAttributes().id_tech_staff.primaryKey).toBe(true);
    expect(String(User.getAttributes().id_user.type)).toBe('UUID');
    expect(String(Role.getAttributes().id_role.type)).toBe('UUID');
    expect(String(TechIssue.getAttributes().id_tech_issue.type)).toBe('UUID');
    expect(String(TechReport.getAttributes().id_tech_report.type)).toBe('UUID');
    expect(String(Client.getAttributes().id_company.type)).toBe('UUID');
    expect(String(TechStaff.getAttributes().id_client.type)).toBe('UUID');
    expect(User.getAttributes().e_mail.unique).toBe(true);
    expect(Company.getAttributes()).not.toHaveProperty('password');
    expect(Client.getAttributes()).not.toHaveProperty('e_mail');
    expect(TechStaff.getAttributes()).not.toHaveProperty('phone');
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
    expect(User.associations.companyProfile.target).toBe(Company);
    expect(User.associations.clientProfile.target).toBe(Client);
    expect(User.associations.techStaffProfile.target).toBe(TechStaff);
  });
});

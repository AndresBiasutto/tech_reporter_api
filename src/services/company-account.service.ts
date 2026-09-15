import bcrypt from 'bcrypt';
import { sequelize } from '../config/database';
import { User } from '../models';
import { ClientRepository } from '../repositories/client.repository';
import { RoleRepository } from '../repositories/role.repository';
import { TechIssueRepository } from '../repositories/tech-issue.repository';
import { TechReportRepository } from '../repositories/tech-report.repository';
import { TechStaffRepository } from '../repositories/tech-staff.repository';
import { UserRepository } from '../repositories/user.repository';
import { ConflictError, NotFoundError } from '../utils/errors';

export interface CreateManagedAccountData {
  name: string;
  email: string;
  phone: string;
  password: string;
  roleId: string;
}

export class CompanyAccountService {
  private readonly users = new UserRepository();
  private readonly roles = new RoleRepository();
  private readonly clients = new ClientRepository();
  private readonly techStaff = new TechStaffRepository();
  private readonly issues = new TechIssueRepository();
  private readonly reports = new TechReportRepository();

  async createClient(companyId: string, data: CreateManagedAccountData): Promise<{ user: User; roleId: string }> {
    return sequelize.transaction(async (transaction) => {
      await this.assertAvailableEmail(data.email, transaction);
      await this.requireRole(data.roleId, transaction);
      const user = await this.users.create(
        { ...data, password: await bcrypt.hash(data.password, 12), accountType: 'client' },
        transaction
      );
      await this.clients.create(user.id_user, companyId, data.roleId, transaction);
      return { user, roleId: data.roleId };
    });
  }

  async createTechStaff(
    data: CreateManagedAccountData & { clientId: string }
  ): Promise<{ user: User; roleId: string; clientId: string }> {
    return sequelize.transaction(async (transaction) => {
      await this.assertAvailableEmail(data.email, transaction);
      await this.requireRole(data.roleId, transaction);
      const client = await this.clients.findById(data.clientId, transaction);
      if (!client) throw new NotFoundError('Client not found');
      const user = await this.users.create(
        { ...data, password: await bcrypt.hash(data.password, 12), accountType: 'tech_staff' },
        transaction
      );
      await this.techStaff.create(user.id_user, data.clientId, data.roleId, transaction);
      return { user, roleId: data.roleId, clientId: data.clientId };
    });
  }

  async assignClientRole(clientId: string, roleId: string): Promise<void> {
    return sequelize.transaction(async (transaction) => {
      const [client] = await Promise.all([this.clients.findById(clientId, transaction), this.requireRole(roleId, transaction)]);
      if (!client) throw new NotFoundError('Client not found');
      await this.clients.updateRole(client, roleId, transaction);
    });
  }

  async assignTechStaffRole(techStaffId: string, roleId: string): Promise<void> {
    return sequelize.transaction(async (transaction) => {
      const [techStaff] = await Promise.all([this.techStaff.findById(techStaffId, transaction), this.requireRole(roleId, transaction)]);
      if (!techStaff) throw new NotFoundError('Tech staff member not found');
      await this.techStaff.updateRole(techStaff, roleId, transaction);
    });
  }

  async deleteTechStaff(techStaffId: string): Promise<void> {
    return sequelize.transaction(async (transaction) => {
      const techStaff = await this.techStaff.findById(techStaffId, transaction);
      if (!techStaff) throw new NotFoundError('Tech staff member not found');
      await this.reports.destroyByTechStaffId(techStaff.id_tech_staff, transaction);
      await this.techStaff.destroy(techStaff, transaction);
      await this.users.destroyById(techStaff.id_tech_staff, transaction);
    });
  }

  async deleteClient(clientId: string): Promise<void> {
    return sequelize.transaction(async (transaction) => {
      const client = await this.clients.findById(clientId, transaction);
      if (!client) throw new NotFoundError('Client not found');

      const [techStaffMembers, issues] = await Promise.all([
        this.techStaff.findAllByClientId(clientId, transaction),
        this.issues.findAllByClientId(clientId, transaction)
      ]);
      await this.reports.destroyByIssueIds(issues.map((issue) => issue.id_tech_issue), transaction);
      for (const techStaff of techStaffMembers) {
        await this.reports.destroyByTechStaffId(techStaff.id_tech_staff, transaction);
        await this.techStaff.destroy(techStaff, transaction);
        await this.users.destroyById(techStaff.id_tech_staff, transaction);
      }
      await this.issues.destroyByClientId(clientId, transaction);
      await this.clients.destroy(client, transaction);
      await this.users.destroyById(client.id_client, transaction);
    });
  }

  private async assertAvailableEmail(email: string, transaction: Parameters<UserRepository['findByEmail']>[1]): Promise<void> {
    if (await this.users.findByEmail(email, transaction)) throw new ConflictError('Email is already in use');
  }

  private async requireRole(roleId: string, transaction: Parameters<RoleRepository['findById']>[1]): Promise<void> {
    if (!(await this.roles.findById(roleId, transaction))) throw new NotFoundError('Role not found');
  }
}

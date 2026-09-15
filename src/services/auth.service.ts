import bcrypt from 'bcrypt';
import { sequelize } from '../config/database';
import { AccountType, User } from '../models';
import { ClientRepository } from '../repositories/client.repository';
import { TechStaffRepository } from '../repositories/tech-staff.repository';
import { UpdateUserData, UserRepository } from '../repositories/user.repository';
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors';

export interface AuthenticatedAccount {
  user: User;
  roleId: string | null;
}

export interface UpdateOwnAccountData extends Omit<UpdateUserData, 'password'> {
  password?: string;
}

export class AuthService {
  private readonly users = new UserRepository();
  private readonly clients = new ClientRepository();
  private readonly techStaff = new TechStaffRepository();

  async login(email: string, password: string): Promise<AuthenticatedAccount> {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid email or password');
    }
    return this.resolveAccount(user);
  }

  async getOwnAccount(userId: string): Promise<AuthenticatedAccount> {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedError('Authentication is no longer valid');
    return this.resolveAccount(user);
  }

  async updateOwnAccount(userId: string, data: UpdateOwnAccountData): Promise<AuthenticatedAccount> {
    return sequelize.transaction(async (transaction) => {
      const user = await this.users.findById(userId, transaction);
      if (!user) throw new NotFoundError('User not found');

      if (data.email && data.email !== user.e_mail) {
        const owner = await this.users.findByEmail(data.email, transaction);
        if (owner) throw new ConflictError('Email is already in use');
      }

      const password = data.password ? await bcrypt.hash(data.password, 12) : undefined;
      const updated = await this.users.update(user, { ...data, password }, transaction);
      return this.resolveAccount(updated, transaction);
    });
  }

  private async resolveAccount(user: User, transaction?: Parameters<ClientRepository['findById']>[1]): Promise<AuthenticatedAccount> {
    const roleId = await this.findRoleId(user.id_user, user.account_type, transaction);
    return { user, roleId };
  }

  private async findRoleId(
    userId: string,
    accountType: AccountType,
    transaction?: Parameters<ClientRepository['findById']>[1]
  ): Promise<string | null> {
    if (accountType === 'company') return null;
    if (accountType === 'client') {
      const client = await this.clients.findById(userId, transaction);
      if (!client) throw new NotFoundError('Client profile not found');
      return client.id_role;
    }
    const techStaff = await this.techStaff.findById(userId, transaction);
    if (!techStaff) throw new NotFoundError('Tech staff profile not found');
    return techStaff.id_role;
  }
}

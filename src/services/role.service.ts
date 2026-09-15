import { sequelize } from '../config/database';
import { Role } from '../models';
import { ClientRepository } from '../repositories/client.repository';
import { RoleRepository } from '../repositories/role.repository';
import { TechStaffRepository } from '../repositories/tech-staff.repository';
import { ConflictError, NotFoundError } from '../utils/errors';

export class RoleService {
  private readonly roles = new RoleRepository();
  private readonly clients = new ClientRepository();
  private readonly techStaff = new TechStaffRepository();

  list(): Promise<Role[]> {
    return this.roles.findAll();
  }

  async create(name: string): Promise<Role> {
    if (await this.roles.findByName(name)) throw new ConflictError('Role name is already in use');
    return this.roles.create(name);
  }

  async update(id: string, name: string): Promise<Role> {
    const role = await this.roles.findById(id);
    if (!role) throw new NotFoundError('Role not found');
    const sameName = await this.roles.findByName(name);
    if (sameName && sameName.id_role !== id) throw new ConflictError('Role name is already in use');
    return this.roles.update(role, name);
  }

  async delete(id: string): Promise<void> {
    return sequelize.transaction(async (transaction) => {
      const role = await this.roles.findById(id, transaction);
      if (!role) throw new NotFoundError('Role not found');
      const [clients, techStaff] = await Promise.all([
        this.clients.findAllByRoleId(id, transaction),
        this.techStaff.findAllByRoleId(id, transaction)
      ]);
      if (clients.length || techStaff.length) {
        throw new ConflictError('A role assigned to accounts cannot be deleted');
      }
      await this.roles.destroy(role, transaction);
    });
  }
}

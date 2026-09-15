import { Transaction } from 'sequelize';
import { Role } from '../models';

export class RoleRepository {
  findById(id: string, transaction?: Transaction): Promise<Role | null> {
    return Role.findByPk(id, { transaction });
  }

  findByName(name: string, transaction?: Transaction): Promise<Role | null> {
    return Role.findOne({ where: { name }, transaction });
  }

  findAll(): Promise<Role[]> {
    return Role.findAll({ order: [['name', 'ASC']] });
  }

  create(name: string, transaction?: Transaction): Promise<Role> {
    return Role.create({ name }, { transaction });
  }

  update(role: Role, name: string, transaction?: Transaction): Promise<Role> {
    return role.update({ name }, { transaction });
  }

  destroy(role: Role, transaction?: Transaction): Promise<void> {
    return role.destroy({ transaction }).then(() => undefined);
  }
}

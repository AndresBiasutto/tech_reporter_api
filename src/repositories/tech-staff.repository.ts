import { Transaction } from 'sequelize';
import { TechStaff } from '../models';

export class TechStaffRepository {
  findById(id: string, transaction?: Transaction): Promise<TechStaff | null> {
    return TechStaff.findByPk(id, { transaction });
  }

  findAllByClientId(clientId: string, transaction?: Transaction): Promise<TechStaff[]> {
    return TechStaff.findAll({ where: { id_client: clientId }, transaction });
  }

  findAllByRoleId(roleId: string, transaction?: Transaction): Promise<TechStaff[]> {
    return TechStaff.findAll({ where: { id_role: roleId }, transaction });
  }

  create(id: string, clientId: string, roleId: string, transaction?: Transaction): Promise<TechStaff> {
    return TechStaff.create({ id_tech_staff: id, id_client: clientId, id_role: roleId }, { transaction });
  }

  updateRole(techStaff: TechStaff, roleId: string, transaction?: Transaction): Promise<TechStaff> {
    return techStaff.update({ id_role: roleId }, { transaction });
  }

  destroy(techStaff: TechStaff, transaction?: Transaction): Promise<void> {
    return techStaff.destroy({ transaction }).then(() => undefined);
  }
}

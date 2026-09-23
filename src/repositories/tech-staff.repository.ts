import { Transaction } from 'sequelize';
import { Client, Role, TechStaff, User } from '../models';

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

  findWithDetailsById(id: string): Promise<TechStaff | null> {
    return TechStaff.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Role, as: 'role' },
        { model: Client, as: 'client', required: true }
      ]
    });
  }

  findAllWithDetailsByCompanyId(companyId: string): Promise<TechStaff[]> {
    return TechStaff.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Role, as: 'role' },
        { model: Client, as: 'client', required: true, where: { id_company: companyId } }
      ],
      order: [['id_tech_staff', 'ASC']]
    });
  }

  findAllWithDetailsByClientId(clientId: string): Promise<TechStaff[]> {
    return TechStaff.findAll({
      where: { id_client: clientId },
      include: [{ model: User, as: 'user' }, { model: Role, as: 'role' }],
      order: [['id_tech_staff', 'ASC']]
    });
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

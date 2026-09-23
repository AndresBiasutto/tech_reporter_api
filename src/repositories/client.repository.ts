import { Transaction } from 'sequelize';
import { Client, Role, User } from '../models';

export class ClientRepository {
  findById(id: string, transaction?: Transaction): Promise<Client | null> {
    return Client.findByPk(id, { transaction });
  }

  findAllByRoleId(roleId: string, transaction?: Transaction): Promise<Client[]> {
    return Client.findAll({ where: { id_role: roleId }, transaction });
  }

  findWithDetailsById(id: string): Promise<Client | null> {
    return Client.findByPk(id, { include: [{ model: User, as: 'user' }, { model: Role, as: 'role' }] });
  }

  findAllByCompanyId(companyId: string): Promise<Client[]> {
    return Client.findAll({
      where: { id_company: companyId },
      include: [{ model: User, as: 'user' }, { model: Role, as: 'role' }],
      order: [['id_client', 'ASC']]
    });
  }

  create(id: string, companyId: string, roleId: string, transaction?: Transaction): Promise<Client> {
    return Client.create({ id_client: id, id_company: companyId, id_role: roleId }, { transaction });
  }

  updateRole(client: Client, roleId: string, transaction?: Transaction): Promise<Client> {
    return client.update({ id_role: roleId }, { transaction });
  }

  destroy(client: Client, transaction?: Transaction): Promise<void> {
    return client.destroy({ transaction }).then(() => undefined);
  }
}

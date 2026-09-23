import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import type { Role } from './role.model';
import type { User } from './user.model';

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
  declare id_client: string;
  declare id_company: string;
  declare id_role: string;
  declare user?: User;
  declare role?: Role;

  static initialize(sequelize: Sequelize): void {
    Client.init(
      {
        id_client: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        id_company: { type: DataTypes.UUID, allowNull: false },
        id_role: { type: DataTypes.UUID, allowNull: false }
      },
      { sequelize, tableName: 'client', timestamps: false }
    );
  }
}

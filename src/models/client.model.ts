import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
  declare id_client: CreationOptional<number>;
  declare name: string;
  declare e_mail: string;
  declare phone: string;
  declare password: string;
  declare id_company: number;
  declare id_role: number;

  static initialize(sequelize: Sequelize): void {
    Client.init(
      {
        id_client: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        e_mail: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        id_company: { type: DataTypes.INTEGER, allowNull: false },
        id_role: { type: DataTypes.INTEGER, allowNull: false }
      },
      { sequelize, tableName: 'client', timestamps: false }
    );
  }
}

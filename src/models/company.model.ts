import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
  declare id_company: CreationOptional<number>;
  declare name: string;
  declare e_mail: string;
  declare phone: string;
  declare password: string;

  static initialize(sequelize: Sequelize): void {
    Company.init(
      {
        id_company: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        e_mail: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
      },
      { sequelize, tableName: 'company', timestamps: false }
    );
  }
}

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
  declare id_company: string;

  static initialize(sequelize: Sequelize): void {
    Company.init(
      { id_company: { type: DataTypes.UUID, primaryKey: true, allowNull: false } },
      { sequelize, tableName: 'company', timestamps: false }
    );
  }
}

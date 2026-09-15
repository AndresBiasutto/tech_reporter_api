import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class TechStaff extends Model<InferAttributes<TechStaff>, InferCreationAttributes<TechStaff>> {
  declare id_tech_staff: string;
  declare id_role: string;
  declare id_client: string;

  static initialize(sequelize: Sequelize): void {
    TechStaff.init(
      {
        id_tech_staff: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
        id_role: { type: DataTypes.UUID, allowNull: false },
        id_client: { type: DataTypes.UUID, allowNull: false }
      },
      { sequelize, tableName: 'tech_staff', timestamps: false }
    );
  }
}

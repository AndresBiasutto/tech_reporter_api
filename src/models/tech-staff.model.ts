import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class TechStaff extends Model<InferAttributes<TechStaff>, InferCreationAttributes<TechStaff>> {
  declare id_tech_staff: CreationOptional<number>;
  declare name: string;
  declare e_mail: string;
  declare phone: string;
  declare password: string;
  declare id_role: number;
  declare id_client: number;

  static initialize(sequelize: Sequelize): void {
    TechStaff.init(
      {
        id_tech_staff: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        e_mail: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        id_role: { type: DataTypes.INTEGER, allowNull: false },
        id_client: { type: DataTypes.INTEGER, allowNull: false }
      },
      { sequelize, tableName: 'tech_staff', timestamps: false }
    );
  }
}

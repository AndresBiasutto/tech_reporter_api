import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class TechReport extends Model<InferAttributes<TechReport>, InferCreationAttributes<TechReport>> {
  declare id_tech_report: CreationOptional<number>;
  declare tech_solution: string | null;
  declare date_start: Date;
  declare date_end: Date | null;
  declare id_tech_staff: number;
  declare id_tech_issue: number;

  static initialize(sequelize: Sequelize): void {
    TechReport.init(
      {
        id_tech_report: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        tech_solution: { type: DataTypes.TEXT, allowNull: true },
        date_start: { type: DataTypes.DATE, allowNull: false },
        date_end: { type: DataTypes.DATE, allowNull: true },
        id_tech_staff: { type: DataTypes.INTEGER, allowNull: false },
        id_tech_issue: { type: DataTypes.INTEGER, allowNull: false }
      },
      { sequelize, tableName: 'tech_report', timestamps: false }
    );
  }
}

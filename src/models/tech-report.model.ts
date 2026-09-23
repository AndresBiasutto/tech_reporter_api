import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import type { TechIssue } from './tech-issue.model';
import type { TechStaff } from './tech-staff.model';

export class TechReport extends Model<InferAttributes<TechReport>, InferCreationAttributes<TechReport>> {
  declare id_tech_report: CreationOptional<string>;
  declare tech_solution: string | null;
  declare date_start: Date;
  declare date_end: Date | null;
  declare id_tech_staff: string;
  declare id_tech_issue: string;
  declare techStaffMember?: TechStaff;
  declare techIssue?: TechIssue;

  static initialize(sequelize: Sequelize): void {
    TechReport.init(
      {
        id_tech_report: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        tech_solution: { type: DataTypes.TEXT, allowNull: true },
        date_start: { type: DataTypes.DATE, allowNull: false },
        date_end: { type: DataTypes.DATE, allowNull: true },
        id_tech_staff: { type: DataTypes.UUID, allowNull: false },
        id_tech_issue: { type: DataTypes.UUID, allowNull: false }
      },
      { sequelize, tableName: 'tech_report', timestamps: false }
    );
  }
}

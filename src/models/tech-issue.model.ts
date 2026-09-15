import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class TechIssue extends Model<InferAttributes<TechIssue>, InferCreationAttributes<TechIssue>> {
  declare id_tech_issue: CreationOptional<number>;
  declare where_to_go: string | null;
  declare urgency_level: string;
  declare issue_description: string;
  declare issue_status: string;
  declare id_client: number;

  static initialize(sequelize: Sequelize): void {
    TechIssue.init(
      {
        id_tech_issue: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        where_to_go: { type: DataTypes.STRING, allowNull: true },
        urgency_level: { type: DataTypes.STRING, allowNull: false },
        issue_description: { type: DataTypes.TEXT, allowNull: false },
        issue_status: { type: DataTypes.STRING, allowNull: false },
        id_client: { type: DataTypes.INTEGER, allowNull: false }
      },
      { sequelize, tableName: 'tech_issue', timestamps: false }
    );
  }
}

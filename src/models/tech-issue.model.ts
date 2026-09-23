import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import type { Client } from './client.model';

export class TechIssue extends Model<InferAttributes<TechIssue>, InferCreationAttributes<TechIssue>> {
  declare id_tech_issue: CreationOptional<string>;
  declare where_to_go: string | null;
  declare urgency_level: string;
  declare issue_description: string;
  declare issue_status: string;
  declare id_client: string;
  declare client?: Client;

  static initialize(sequelize: Sequelize): void {
    TechIssue.init(
      {
        id_tech_issue: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        where_to_go: { type: DataTypes.STRING, allowNull: true },
        urgency_level: { type: DataTypes.STRING, allowNull: false },
        issue_description: { type: DataTypes.TEXT, allowNull: false },
        issue_status: { type: DataTypes.STRING, allowNull: false },
        id_client: { type: DataTypes.UUID, allowNull: false }
      },
      { sequelize, tableName: 'tech_issue', timestamps: false }
    );
  }
}

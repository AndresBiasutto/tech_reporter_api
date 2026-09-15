import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { Client, Company, Role, TechIssue, TechReport, TechStaff } from '../models';

const port = Number(process.env.DB_PORT ?? 5432);

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME ?? '',
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASS ?? '',
  host: process.env.DB_HOST ?? 'localhost',
  port,
  logging: false
});

Company.initialize(sequelize);
Role.initialize(sequelize);
Client.initialize(sequelize);
TechStaff.initialize(sequelize);
TechIssue.initialize(sequelize);
TechReport.initialize(sequelize);

Company.hasMany(Client, { foreignKey: 'id_company', as: 'clients' });
Client.belongsTo(Company, { foreignKey: 'id_company', as: 'company' });
Role.hasMany(Client, { foreignKey: 'id_role', as: 'clients' });
Client.belongsTo(Role, { foreignKey: 'id_role', as: 'role' });
Role.hasMany(TechStaff, { foreignKey: 'id_role', as: 'techStaffMembers' });
TechStaff.belongsTo(Role, { foreignKey: 'id_role', as: 'role' });
Client.hasMany(TechStaff, { foreignKey: 'id_client', as: 'techStaffMembers' });
TechStaff.belongsTo(Client, { foreignKey: 'id_client', as: 'client' });
Client.hasMany(TechIssue, { foreignKey: 'id_client', as: 'techIssues' });
TechIssue.belongsTo(Client, { foreignKey: 'id_client', as: 'client' });
TechStaff.hasMany(TechReport, { foreignKey: 'id_tech_staff', as: 'techReports' });
TechReport.belongsTo(TechStaff, { foreignKey: 'id_tech_staff', as: 'techStaffMember' });
TechIssue.hasMany(TechReport, { foreignKey: 'id_tech_issue', as: 'techReports' });
TechReport.belongsTo(TechIssue, { foreignKey: 'id_tech_issue', as: 'techIssue' });

function assertDatabaseConfiguration(): void {
  const requiredVariables = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT'];
  const missingVariables = requiredVariables.filter((variable) => !process.env[variable]);

  if (missingVariables.length > 0) {
    throw new Error(`Missing required database configuration: ${missingVariables.join(', ')}`);
  }
}

export async function connectDatabase(): Promise<void> {
  assertDatabaseConfiguration();
  await sequelize.authenticate();

  if (process.env.DB_SYNC_MODE === 'alter') {
    await sequelize.sync({ alter: true });
  }
}

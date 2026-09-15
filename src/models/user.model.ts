import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export const accountTypes = ['company', 'client', 'tech_staff'] as const;
export type AccountType = (typeof accountTypes)[number];

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id_user: CreationOptional<string>;
  declare name: string;
  declare e_mail: string;
  declare phone: string;
  declare password: string;
  declare account_type: AccountType;

  static initialize(sequelize: Sequelize): void {
    User.init(
      {
        id_user: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        e_mail: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        account_type: { type: DataTypes.ENUM(...accountTypes), allowNull: false }
      },
      { sequelize, tableName: 'user', timestamps: false }
    );
  }
}

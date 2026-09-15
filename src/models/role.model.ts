import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id_role: CreationOptional<string>;
  declare name: string;

  static initialize(sequelize: Sequelize): void {
    Role.init(
      {
        id_role: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
      },
      { sequelize, tableName: 'role', timestamps: false }
    );
  }
}

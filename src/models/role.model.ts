import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id_role: CreationOptional<number>;
  declare name: string;

  static initialize(sequelize: Sequelize): void {
    Role.init(
      {
        id_role: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false }
      },
      { sequelize, tableName: 'role', timestamps: false }
    );
  }
}

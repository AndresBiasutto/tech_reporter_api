import { Transaction } from 'sequelize';
import { AccountType, User } from '../models';

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType: AccountType;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export class UserRepository {
  findById(id: string, transaction?: Transaction): Promise<User | null> {
    return User.findByPk(id, { transaction });
  }

  findByEmail(email: string, transaction?: Transaction): Promise<User | null> {
    return User.findOne({ where: { e_mail: email }, transaction });
  }
  updateProfile(
    user: User, data: UpdateUserData, transaction?: Transaction): Promise<User> {
    return user.update(data, { transaction });
  }

  create(data: CreateUserData, transaction?: Transaction): Promise<User> {
    return User.create(
      {
        name: data.name,
        e_mail: data.email,
        phone: data.phone,
        password: data.password,
        account_type: data.accountType
      },
      { transaction }
    );
  }

  async update(user: User, data: UpdateUserData, transaction?: Transaction): Promise<User> {
    return user.update(
      {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.email !== undefined ? { e_mail: data.email } : {}),
        ...(data.phone !== undefined ? { phone: data.phone } : {}),
        ...(data.password !== undefined ? { password: data.password } : {})
      },
      { transaction }
    );
  }

  destroyById(id: string, transaction?: Transaction): Promise<number> {
    return User.destroy({ where: { id_user: id }, transaction });
  }
}

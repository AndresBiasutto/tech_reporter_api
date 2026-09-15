import bcrypt from 'bcrypt';
import { Company, User } from '../models';

const COMPANY_EMAIL = 'company@email.com';

/** Creates the sole Company profile when development sync initializes an empty schema. */
export async function seedCompany(): Promise<void> {
  const existing = await User.findOne({ where: { e_mail: COMPANY_EMAIL } });
  if (existing) {
    return;
  }

  const user = await User.create({
    name: 'company',
    e_mail: COMPANY_EMAIL,
    phone: '12341234',
    password: await bcrypt.hash('1234', 12),
    account_type: 'company'
  });

  await Company.create({ id_company: user.id_user });
}

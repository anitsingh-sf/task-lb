import {Users} from '../models';

export function givenUser(user?: Partial<Users>) {
  const data = Object.assign(
    {
      firstname: 'Anit',
      middlename: '',
      lastname: 'Singh',
      email: 'anitmehta47@gmail.com',
      phone: '8427615969',
      role: 1,
      address: 'Ludhiana',
      customer: 2,
    },
    user,
  );

  return new Users(data);
}

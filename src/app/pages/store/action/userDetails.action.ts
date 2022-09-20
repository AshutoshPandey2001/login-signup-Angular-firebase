import { UserProfile } from 'src/app/pages/models/user-data';

export class GetUsers {
  static readonly type = '[UserDetails].Get';
}

export class AddUser {
  static readonly type = 'Add user';
  constructor(public payload: any) {
    console.log('user', payload);
  }
}

export class GetUsers {
  static readonly type = '[UserDetails].Get';
}

export class AddUser {
  static readonly type = 'Add user';
  constructor(public payload: any) {
    // console.log('user', payload);
  }
}
export class UpdateUsers {
  static readonly type = '[UserDetails].Update';
  constructor(public payload: any) {}
}
export class DeleteUsers {
  static readonly type = '[UserDetails].delete';
  constructor(public uid: any) {}
}

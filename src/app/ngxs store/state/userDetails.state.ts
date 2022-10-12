// import { createInjectableDefinitionMap } from '@angular/compiler/src/render3/partial/injectable';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthService } from '../../Services/auth-Service/auth.service';
import {
  AddUser,
  DeleteUsers,
  // GetUserDispatch,
  GetUsers,
  UpdateUsers,
} from '../action/userDetails.action';

// State Model
export class loginStateModel {
  usersProfile: any;
  // dispatchdetail: any;
}

//State
@State<loginStateModel>({
  name: 'users',
  defaults: {
    usersProfile: null,
    // dispatchdetail: null,
  },
})
@Injectable()
export class LoginState {
  // Useruid: any;
  // user$ = this.authService.currentUser$.subscribe((res) => {
  //   console.log(res?.uid);
  //   this.Useruid = res;
  // });
  constructor(private authService: AuthService) {}
  @Selector()
  static getUserList(state: loginStateModel) {
    return state.usersProfile;
  }

  // @Action(GetUsers)
  // async getUserss({ getState, setState }: StateContext<loginStateModel>) {
  //   // console.log('State Action');
  //   let res = await this.authService.getUserDetails();
  //   const state = getState();
  //   console.log('tap res', res);
  //   setState({
  //     ...state,
  //     usersProfile: res,
  //   });
  // }

  @Action(AddUser)
  async addUserdata(
    { getState, setState }: StateContext<loginStateModel>,
    { payload }: AddUser
  ) {
    console.log('State Action', payload);
    const state = getState();
    setState({
      ...state,
      usersProfile: payload,
    });
  }

  @Action(UpdateUsers)
  async updateUser(
    { getState, setState }: StateContext<loginStateModel>,
    { payload }: UpdateUsers
  ) {
    // this.authService.updateUserData(uid, payload);
    const state = getState();
    const usreList = state.usersProfile;
    // usreList.map((usr: any) => {
    //   console.log('after', usr);

    //   if (usr.uid == payload.uid) {
    //     usr = payload;
    //     console.log('before', usr);
    //     console.log('usreList', usreList);
    //   }
    // });
    const index = usreList.findIndex((usr: any) => usr.uid == payload.uid);
    console.log('Update State userlist', usreList[index]);
    console.log('update State', index);
    usreList[index] = payload;
    console.log('state user list', usreList);
    setState({
      ...state,
      usersProfile: usreList,
    });
  }
  @Action(DeleteUsers)
  deleteUser(
    { getState, setState }: StateContext<loginStateModel>,
    { uid }: DeleteUsers
  ) {
    const state = getState();
    const filteredArray = state.usersProfile.filter(
      (item: any) => item.uid !== uid
    );
    console.log('filtered', filteredArray);
    setState({
      ...state,
      usersProfile: filteredArray,
    });
    console.log('deleted uid', uid);
  }

  // Dispatch Content
  // @Action(GetUserDispatch)
  // async getnewdetail(
  //   { getState, setState }: StateContext<loginStateModel>,
  //   { payload }: GetUserDispatch
  // ) {
  //   console.log('State Action', payload);
  //   const state = getState();
  //   setState({
  //     ...state,
  //     usersProfile: payload,
  //   });
  // }
}

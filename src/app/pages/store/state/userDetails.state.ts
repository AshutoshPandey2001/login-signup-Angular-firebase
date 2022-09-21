import { createInjectableDefinitionMap } from '@angular/compiler/src/render3/partial/injectable';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthService } from '../../../shared/service/auth-Service/auth.service';
import {
  AddUser,
  DeleteUsers,
  GetUsers,
  UpdateUsers,
} from '../action/userDetails.action';
import { tap } from 'rxjs/operators';
import { user } from '@angular/fire/auth';

// State Model
export class loginStateModel {
  usersProfile: any;
}

//State
@State<loginStateModel>({
  name: 'users',
  defaults: {
    usersProfile: null,
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
    { payload, uid }: UpdateUsers
  ) {
    // this.authService.updateUserData(uid, payload);
    const state = getState();
    const usreList = state.usersProfile;
    const index = usreList.findIndex((usr: any) => usr.uid == uid);
    console.log('Update State userlist', usreList[index]);
    console.log('update State', index);
    usreList[index] = payload;
  }
  @Action(DeleteUsers)
  deleteUser(
    { getState, patchState, setState }: StateContext<loginStateModel>,
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
}

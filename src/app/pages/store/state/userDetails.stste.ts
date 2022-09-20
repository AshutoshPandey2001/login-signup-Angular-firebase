import { createInjectableDefinitionMap } from '@angular/compiler/src/render3/partial/injectable';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserProfile } from 'src/app/pages/models/user-data';
import { AuthService } from '../../service/auth.service';
import { GetUsers } from '../action/userDetails.action';
import { tap } from 'rxjs/operators';

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

  @Action(GetUsers)
  async getUserss({ getState, setState }: StateContext<loginStateModel>) {
    // console.log('State Action');
    let res = await this.authService.getUserDetails();
    const state = getState();
    console.log('tap res', res);
    setState({
      ...state,
      usersProfile: res,
    });
  }
}

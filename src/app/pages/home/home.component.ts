import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import { async, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Select, Store } from '@ngxs/store';
import { AddUser, GetUsers } from '../store/action/userDetails.action';
import { UserProfile } from 'src/app/pages/models/user-data';
import { LoginState } from '../store/state/userDetails.stste';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  EditUserForm: FormGroup;
  UserUID$: any;
  selectedUid: any;

  userData: any = [];

  @Select(LoginState.getUserList) userData$: any;

  constructor(
    public authService: AuthService,
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.EditUserForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(6)]],
      addrass: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    console.log(
      'Current usere',
      this.user$.subscribe((res) => {
        console.log(res?.uid);
        this.UserUID$ = res?.uid;
      })
    );
    this.getUsers();
    // console.log(this.user$);
    this.userData$.subscribe((res: any) => {
      this.userData = res;

      // this.userData = res;
    });
    console.log('original User Data', this.userData);
  }

  getUsers() {
    this.store.dispatch(new GetUsers());
    // this.authService.getUserDetails().subscribe((result) => {
    //   console.log(result);
    //   let user = {
    //     email: 'adbajdfsgjf',
    //   };
    //   this.store.dispatch(new AddUser(user));
    // });
  }
  editDetails(uid: any, obj: any) {
    this.selectedUid = uid;
    console.log(this.selectedUid);
    this.EditUserForm.patchValue({
      displayName: obj.displayName,
      phoneNumber: obj.phoneNumber,
      email: obj.email,
      addrass: obj.addrass,
    });
  }

  updateData() {
    console.log(this.EditUserForm.value);

    this.authService.updateUserData(this.selectedUid, this.EditUserForm.value);
    this.getUsers();

    this.clearFormData();

    // this.userData[this.selectedUid].displayName =
    //   this.EditUserForm.value.displayName;
    // this.userData[this.selectedUid].phoneNumber =
    //   this.EditUserForm.value.mobileNo;
    // this.userData[this.selectedUid].email = this.EditUserForm.value.email;
    // console.log('Updated Data', this.userData);
  }

  deleteUser(uid: any) {
    this.selectedUid = uid;
    console.log(this.selectedUid);
    this.afs.collection('UsersDetails').doc(this.selectedUid).delete();
    this.getUsers();
  }

  closeForm() {
    this.clearFormData();
  }
  clearFormData() {
    this.EditUserForm.reset();
  }

  get f() {
    return this.EditUserForm.controls;
  }
}

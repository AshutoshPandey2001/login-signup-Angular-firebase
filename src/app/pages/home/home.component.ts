import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { async, Observable } from 'rxjs';
import { AuthService } from '../../shared/service/auth-Service/auth.service';
import { Select, Store } from '@ngxs/store';
import {
  AddUser,
  DeleteUsers,
  GetUsers,
  UpdateUsers,
} from '../store/action/userDetails.action';
import { LoginState } from '../store/state/userDetails.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchitem: any;
  p: any;
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
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService
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
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      uid: [''],
    });
  }

  ngOnInit(): void {
    // console.log(
    //   'Current usere',
    //   this.user$.subscribe((res) => {
    //     console.log(res?.uid);
    //     this.UserUID$ = res?.uid;
    //   })
    // );
    this.getUsers();
    // console.log(this.user$);
    this.userData$.subscribe((res: any) => {
      this.userData = res;

      // this.userData = res;
    });
    console.log('original User Data', this.userData);
  }

  getUsers() {
    // this.store.dispatch(new GetUsers());
    this.authService.getUserDetails().then((res) => {
      console.log('response from Database', res);
      this.store.dispatch(new AddUser(res));
    });

    // console.log('getted users', gettEdUsera);
  }
  editDetails(uid: any, obj: any) {
    this.selectedUid = uid;
    console.log(this.selectedUid);
    this.EditUserForm.patchValue({
      displayName: obj.displayName,
      phoneNumber: obj.phoneNumber,
      email: obj.email,
      addrass: obj.addrass,
      uid: obj.uid,
    });
  }

  async updateData() {
    if (this.EditUserForm.valid) {
      try {
        let updateRes: any = await this.authService.updateUserData(
          this.EditUserForm.value
        );
        this.ngxService.start();
        await this.store.dispatch(new UpdateUsers(this.EditUserForm.value));
        this.ngxService.stop();
        this.clearFormData();
      } catch (error) {}
    } else {
      swal.fire('Error!', 'Please Enter Correct Details', 'error');
    }

    // this.authService.updateUserData(this.selectedUid, this.EditUserForm.value);

    // console.log(this.EditUserForm.value);

    // this.userData[this.selectedUid].displayName =
    //   this.EditUserForm.value.displayName;
    // this.userData[this.selectedUid].phoneNumber =
    //   this.EditUserForm.value.mobileNo;
    // this.userData[this.selectedUid].email = this.EditUserForm.value.email;
    // console.log('Updated Data', this.userData);
  }

  async deleteUser(uid: any) {
    this.selectedUid = uid;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start();

        setTimeout(async () => {
          await this.afs
            .collection('UsersDetails')
            .doc(this.selectedUid)
            .delete();
          this.store.dispatch(new DeleteUsers(this.selectedUid));

          this.ngxService.stop();
          Swal.fire('Deleted!', 'User Details been deleted.', 'success');
        }, 5000);
      }
    });
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

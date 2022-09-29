import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-Service/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  addUserForm: FormGroup;
  userDataList: any = [];
  modelref?: BsModalRef;
  user$ = this.auth.currentUser$;
  ress: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private ngxService: NgxUiLoaderService,
    private modelService: BsModalService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
    this.addUserForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(4)]],

      email: ['', [Validators.required, Validators.email]],
      userType: ['', [Validators.required]],
      uid: [''],
    });
    // this.auth.getUserDetails();
  }

  ngOnInit(): void {
    // this.getData();
    // this.clearData();
  }

  async getData(user: any) {
    await this.auth.getUserDetails().then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].uid == user) {
          this.ress = res[i];
          // console.log(this.ress);
        }
      }
    });
  }
  closeModel() {
    this.modelref?.hide();
    this.cleradduserform();
  }

  async logIn(template: TemplateRef<any>) {
    // this.toast.success('Login Successfully!');

    if (this.loginForm.valid) {
      try {
        let user: any = await this.auth.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        await this.getData(user.user.uid);
        console.log(user);

        if (!this.ress || !this.ress.UserType) {
          await this.patchUser(user.user);
          this.modelref = this.modelService.show(template);
        } else {
          if (user) {
            this.ngxService.start();
            await localStorage.setItem('token', 'true');
            await this.ngxService.stop();
            this.router.navigate(['/Home']);
            this.clearData();
          }
        }
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      swal.fire('Error!', 'Please Enter Correct Details', 'error');
    }
  }

  async patchUser(usrdata: any) {
    this.addUserForm.patchValue({
      displayName: usrdata.displayName,
      email: usrdata.email,
      uid: usrdata.uid,
    });
  }
  async addData() {
    if (this.addUserForm.valid) {
      this.ngxService.start();
      await this.auth.addUserDetails(this.addUserForm.value);
      this.closeModel();
      await localStorage.setItem('token', 'true');
      this.ngxService.stop();
      this.router.navigate(['/Home']);
    } else {
      swal.fire('Error!', 'Please Enter Correct Details', 'error');
    }
  }

  async loginWithgoogle() {
    try {
      let user: any = await this.auth.googleLogin();
      this.auth.addUserDetails(user.user);

      if (user) {
        await localStorage.setItem('token', 'true');
        this.router.navigate(['/Home']);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async loginWithFacebook() {
    try {
      let user: any = await this.auth.faceBookLogin();
      this.auth.addUserDetails(user.user);

      if (user) {
        await localStorage.setItem('token', 'true');
        this.router.navigate(['/Home']);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  async loginwithTwitter() {
    try {
      let user: any = await this.auth.twitterLogin();
      this.auth.addUserDetails(user.user);
      // this.auth.getUserDetails();
      if (user) {
        await localStorage.setItem('token', 'true');
        this.router.navigate(['/Home']);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  signUp() {
    this.router.navigate(['/Signup']);
  }
  clearData() {
    this.loginForm.reset();
  }
  cleradduserform() {
    this.addUserForm.reset();
  }

  get f() {
    return this.loginForm.controls;
  }
  get g() {
    return this.addUserForm.controls;
  }
}

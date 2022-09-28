import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth-Service/auth.service';
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
      userType: [''],
      uid: [''],
    });
    // this.auth.getUserDetails();
  }

  ngOnInit(): void {
    // this.clearData();
    // this.auth.getUserDetails().subscribe();
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
        console.log(user);

        await this.addUser(user.user);
        this.modelref = this.modelService.show(template);

        if (user) {
          // this.ngxService.start();
          // await this.auth.addUserDetails(user.user);

          console.log('user_data', user.user.uid);
          // localStorage.setItem('uid', user.user.uid);
          await localStorage.setItem('token', 'true');
          // this.ngxService.stop();

          // this.router.navigate(['/Home']);
          this.clearData();
        }
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      swal.fire('Error!', 'Please Enter Correct Details', 'error');
    }
  }

  async addUser(usrdata: any) {
    this.addUserForm.patchValue({
      displayName: usrdata.displayName,
      email: usrdata.email,
      uid: usrdata.uid,
    });
  }
  async addData() {
    await this.auth.addUserDetails(this.addUserForm.value);
    this.router.navigate(['/Home']);
    this.closeModel();
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

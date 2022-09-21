import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth-Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userDataList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
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
    // this.auth.getUserDetails();
  }

  ngOnInit(): void {
    this.clearData();
    // this.auth.getUserDetails().subscribe();
  }

  async logIn() {
    if (this.loginForm.valid) {
      try {
        let user: any = await this.auth.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        await this.auth.addUserDetails(user.user);

        if (user) {
          console.log('user_data', user.user.uid);
          // localStorage.setItem('uid', user.user.uid);
          await localStorage.setItem('token', 'true');
          this.router.navigate(['/Home']);

          this.clearData();
        }
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      alert('Please Enter Correct Details');
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
  get f() {
    return this.loginForm.controls;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserProfile } from '../models/user-data';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {
  singUpForm: FormGroup;
  signupbtn = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private auth: AuthService
  ) {
    this.singUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      addrass: ['', [Validators.required, Validators.minLength(10)]],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
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
  }

  ngOnInit(): void {}
  async signUp() {
    if (this.singUpForm.valid) {
      try {
        let userValue: any = await this.auth.signup(
          this.singUpForm.value.email,
          this.singUpForm.value.password
        );
        // this.auth.addUserDetails(userValue.user);

        console.log('User Values', userValue);
        if (userValue) {
          await this.route.navigate(['/Login']);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please Enter All Valid Details');
    }
  }
  login() {
    this.route.navigate(['/Login']);
  }

  clearData() {
    this.singUpForm.reset();
  }

  get f() {
    return this.singUpForm.controls;
  }
}

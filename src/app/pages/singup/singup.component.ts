import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-Service/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import swal from 'sweetalert2';

// import { user } from '@angular/fire/auth';

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
    private auth: AuthService,
    private ngxservice: NgxUiLoaderService
  ) {
    this.singUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      addrass: ['', [Validators.required, Validators.minLength(10)]],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
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
          this.ngxservice.start();
          await this.route.navigate(['/Login']);
          this.ngxservice.stop();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      swal.fire('Error!', 'Please Enter Correct Details', 'error');
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

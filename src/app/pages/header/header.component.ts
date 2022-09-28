import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth-Service/auth.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navBar = [
    {
      title: 'Dashboard',
      path: '/Home',
      icon: 'fal fa-home',
    },
    {
      title: 'Contact Us',
      path: '/contactus',
      icon: 'fal fa-phone',
    },
  ];
  collepsed = false;
  constructor(
    private route: Router,
    private auth: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}
  Logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout!',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start();

        setTimeout(() => {
          this.auth.logout();
          this.route.navigate(['/Login']);
          this.ngxService.stop();

          // Swal.fire('Deleted!', 'User Details been deleted.', 'success');
        }, 3000);
      }
    });
  }

  toggelcollepse() {
    this.collepsed = !this.collepsed;
  }
  closesisenav() {
    this.collepsed = false;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-Service/auth.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavbarData } from './menu.model';
import { menudata } from './menu.data';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // @Input() multiple: boolean = false;
  navBar = menudata;
  collepsed = false;
  submenu = false;
  multiple: any;
  constructor(
    private route: Router,
    private auth: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}
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
  ngOnInit(): void {}
  toggelcollepse() {
    this.collepsed = true;
  }
  closesisenav() {
    this.collepsed = false;
    this.submenu = false;
  }
  showSubmenu() {
    this.submenu = !this.submenu;
    // this.collepsed = true;
  }
  handleClick(item: NavbarData) {
    if (!this.multiple) {
      for (let modelItem of this.navBar) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth-Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navBar = [
    {
      title: 'Home',
      path: '/Home',
    },
    {
      title: 'Contact Us',
      path: '/contactus',
    },
  ];
  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit(): void {}
  Logout() {
    if (confirm('Are You Want to Sure .....?')) {
      this.auth.logout();
      this.route.navigate(['/Login']);
    }
  }
}

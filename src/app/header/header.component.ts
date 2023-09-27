import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isAuth: boolean;

  ngOnInit(): void {
    this.authService.user.subscribe((type) => {
      type == '' ? (this.isAuth = false) : (this.isAuth = true);
    });
  }

  onLogOut() {
    this.authService.logOut();
    this.isAuth = false;
    this.router.navigate(['auth']);
  }
}

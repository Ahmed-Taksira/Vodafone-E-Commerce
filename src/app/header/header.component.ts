import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  isAuth: boolean;
  isAdmin: boolean;
  lang: string = 'en';

  ngOnInit(): void {
    this.authService.user.subscribe((type) => {
      type == '' ? (this.isAuth = false) : (this.isAuth = true);
      type == 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    });

    this.translateService.setDefaultLang(this.lang);
  }

  onLogOut() {
    this.authService.logOut();
    this.isAuth = false;
    this.router.navigate(['auth']);
  }

  switchLanguage() {
    this.lang == 'en' ? (this.lang = 'ar') : (this.lang = 'en');
    this.translateService.use(this.lang);
  }
}

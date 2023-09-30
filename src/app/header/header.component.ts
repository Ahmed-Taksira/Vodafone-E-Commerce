import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private productsService: ProductsService
  ) {}

  isAuth: boolean;
  isAdmin: boolean;
  lang: string = 'en';

  userSub: Subscription;
  categorySub: Subscription;
  category: string = null;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((type) => {
      type == '' ? (this.isAuth = false) : (this.isAuth = true);
      type == 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    });

    this.categorySub = this.productsService.categroySubject.subscribe(
      (c) => (this.category = c)
    );

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

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}

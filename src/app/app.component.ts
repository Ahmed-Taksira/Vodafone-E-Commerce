import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'vodafone-e-commerce by Ahmed Taksira';

  constructor(private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((data) => {
      data.lang == 'en'
        ? (document.body.dir = 'ltr')
        : (document.body.dir = 'rtl');
    });
  }
}

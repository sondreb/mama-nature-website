import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Mama Nature';

  constructor(private translate: TranslateService) {
    // translate.addLangs(['en', 'me', 'ru', 'no']);
    // translate.setDefaultLang('en');
    // translate.use('en'); // Set initial language
  }

  ngOnInit(): void {
    // const browserLang = this.translate.getBrowserLang() || 'en';
    // this.setLanguage(browserLang.match(/en|me|ru|no/) ? browserLang : 'en');
  }

  // setLanguage(lang?: string): void {
  //   if (!lang) {
  //     return;
  //   }

  //   this.translate.use(lang);
  // }
}

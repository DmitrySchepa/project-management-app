import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    const storedLang = localStorage.getItem('pma-lang');    
    const browserLang = this.translate.getBrowserLang() ?? 'en';
    const curLang = storedLang ?? browserLang;
    this.translate.use(curLang);
   }

  ngOnInit(): void {}

  onClickEnglish(): void {
    this.translate.use('en');
    localStorage.setItem('pma-lang', 'en');
  }

  onClickRussian(): void {
    this.translate.use('ru');
    localStorage.setItem('pma-lang', 'ru');
  }

  isChecked(lang: string): boolean {
    console.log(this.translate.currentLang);
    return lang === this.translate.currentLang;
  }

}

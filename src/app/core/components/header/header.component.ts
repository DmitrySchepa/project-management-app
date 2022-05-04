import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { langs } from '../../../constants/langs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.translate.addLangs(langs);
    const storedLang = localStorage.getItem('pma-lang');
    const browserLang = this.translate.getBrowserLang() ?? '';
    const curLang = storedLang ?? browserLang;    

    if (curLang && langs.includes(curLang)) {
      this.translate.use(curLang);
    } else {
      this.translate.use('en');
    }
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
    return lang === this.translate.currentLang;
  }

}

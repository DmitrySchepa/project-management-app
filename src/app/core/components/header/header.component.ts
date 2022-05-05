import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../auth/services/auth.service';
import { langs } from '../../../constants/langs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  enableSticky: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.addLangs(langs);
    const storedLang = localStorage.getItem('pma-lang');
    const browserLang = this.translate.getBrowserLang() ?? '';
    const curLang = storedLang ?? browserLang;    

    if (curLang && langs.includes(curLang)) {
      this.translate.use(curLang);
    } else {
      this.translate.use('en');
    }

    fromEvent(window, 'scroll').subscribe(() => {
      if (this.document.defaultView!.scrollY > 0) {
        this.enableSticky = true;
      } else {
        this.enableSticky = false;
      }
    });
  }

  checkAuth() {
    return this.authService.checkAuth();
  }

  logout() {
    this.authService.logout();
  }

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

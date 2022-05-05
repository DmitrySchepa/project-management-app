import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

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
  ) {}

  ngOnInit(): void {
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
}

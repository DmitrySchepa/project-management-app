import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { selectToken } from '../../../state/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  enableSticky: boolean = false;

  public hasToken$ = this.store.select(selectToken);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly authService: AuthService,
    private readonly store: Store,
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

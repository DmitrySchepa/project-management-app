import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getToken } from './state/actions/user.actions';
import { BoardsService } from './boards/services/boards.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(
    private readonly store: Store,
    private readonly boardService: BoardsService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('pma-token') && localStorage.getItem('pma-user-id')) {
      this.store.dispatch(getToken({ token: localStorage.getItem('pma-token') as string }));
      this.boardService.getBoards();
      this.router.navigate(['main']);
    } else {
      this.authService.logout();
    }
  }
}

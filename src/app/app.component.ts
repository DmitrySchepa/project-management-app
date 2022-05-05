import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { BoardsService } from './boards/services/boards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly boardsService: BoardsService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('pma-token')) {
      this.boardsService.getBoards();
      this.router.navigate(['main', 'boards']);
    }
  }
}

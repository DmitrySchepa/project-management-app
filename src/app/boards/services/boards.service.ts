import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private readonly apiService: ApiService, private readonly authService: AuthService) {}

  getBoards() {
    this.apiService.getBoards().subscribe({
      next: (boards) => console.log(boards),
      error: () => {
        this.authService.logout();
      },
    });
  }

  createBoard(title: string) {
    this.apiService.createBoard(title);
  }

  deleteBoard(boardId: string) {
    this.apiService.deleteBoard(boardId);
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private readonly apiService: ApiService) {}

  getBoards() {
    this.apiService.getBoards().subscribe((boards) => console.log(boards));
  }

  createBoard(title: string) {
    this.apiService.createBoard(title);
  }

  deleteBoard(boardId: string) {
    this.apiService.deleteBoard(boardId);
  }
}

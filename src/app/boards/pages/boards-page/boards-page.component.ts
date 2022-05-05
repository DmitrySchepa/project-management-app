import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';
import { boardsMock } from 'src/mocks/board-model.mock';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards: BoardModel[] = [];

  constructor(private readonly boardsService: BoardsService) {}

  ngOnInit() {
    this.boards = boardsMock;
    // this.boardsService.getBoards();
  }
}

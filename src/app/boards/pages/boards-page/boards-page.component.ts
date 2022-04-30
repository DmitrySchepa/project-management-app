import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards: BoardModel[] = [];

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boards = this.boardsService.boadrsMock;
  }
}

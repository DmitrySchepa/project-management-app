import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards: BoardModel[] = [
    { id: '1', title: 'board 1' },
    { id: '2', title: 'board 2' },
    { id: '3', title: 'board 3' },
    { id: '4', title: 'board 4' },
    { id: '5', title: 'board 5' },
    { id: '6', title: 'board 6' },
    { id: '7', title: 'board 7' },
    { id: '8', title: 'board 8' },
    { id: '9', title: 'board 9' },
    { id: '10', title: 'board 10' },
  ];

  constructor(private readonly boardsService: BoardsService) {}

  ngOnInit() {
    this.boardsService.getBoards();
  }
}

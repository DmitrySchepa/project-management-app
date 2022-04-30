import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn, BoardModel } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  columns: BoardColumn[] = [];

  constructor(private readonly route: ActivatedRoute, private boardsService: BoardsService) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
    this.boardsService.boadrsMock.forEach((elem: BoardModel) => {
      this.columns = elem.columns;
    });
  }

  onAddColumn() {
    this.columns.push({ columnTitle: 'New column', tasks: [] });
  }
}

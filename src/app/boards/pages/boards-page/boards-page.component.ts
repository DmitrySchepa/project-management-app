import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBoards } from '../../../state/selectors/boards.selectors';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards: BoardModel[] = [];

  boards$!: Observable<BoardModel[]>;

  constructor(private readonly store: Store, private readonly boardsService: BoardsService) {}

  ngOnInit() {
    this.boards$ = this.store.select(selectBoards);
  }

  createDialog() {
    this.boardsService.openBoardDialog('create');
  }
}

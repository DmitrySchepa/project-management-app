import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardModel } from '../../models/board.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { selectBoards } from '../../../state/selectors/boards.selectors';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  formSearch: FormGroup;

  public boards: BoardModel[] = [];

  boards$!: Observable<BoardModel[]>;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly boardsService: BoardsService,
  ) {
    this.formSearch = this.fb.group({
      search: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.boards$ = this.store.select(selectBoards);
  }

  createDialog() {
    this.boardsService.openBoardDialog('create');
  }

  onSubmit() {
    const searchString = this.formSearch.value.search;
    this.router.navigateByUrl(`/search?str=${searchString}`);
  }

  navigateToPomodoro() {
    this.router.navigateByUrl(`/pomodoro`);
  }

}

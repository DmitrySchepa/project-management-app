import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn } from '../../models/board.model';
import { Store } from '@ngrx/store';
import { selectBoards } from 'src/app/state/selectors/boards.selectors';
import { BoardsService } from '../../services/boards.service';
import { getColumns } from 'src/app/state/actions/boards.actions';
import { CreateColumnComponent } from '../../components/create-column/create-column.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  columsLength: number = 0;

  columns: BoardColumn[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
    this.store.dispatch(getColumns({ boardId: this.boardId }));
    this.store.select(selectBoards).subscribe((boards) => {
      const columns = boards.find((board) => board.id === this.boardId)?.columns as BoardColumn[];
      this.columns = [...columns];
    });
  }

  onAddColumn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Column title',
      order: this.columns.length + 1,
    };

    const dialogRef = this.dialog.open(CreateColumnComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardsService.createColumn(result.title, dialogConfig.data.order, this.boardId);
      }
    });
  }

  onDeleteColumn() {
    this.boardsService.deleteColumn(this.boardId, '');
  }
}

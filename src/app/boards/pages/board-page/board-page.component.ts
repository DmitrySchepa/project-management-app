import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumn } from '../../models/board.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectBoardColumns } from 'src/app/state/selectors/boards.selectors';
import { BoardsService } from '../../services/boards.service';
import { getColumns } from 'src/app/state/actions/boards.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  columns!: BoardColumn[];

  columns$!: Observable<BoardColumn[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
  ) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
    this.store.dispatch(getColumns({ boardId: this.boardId }));
    this.columns$ = this.store.select(selectBoardColumns(this.boardId)) as Observable<
      BoardColumn[]
    >;
    this.columns$.subscribe((array) => (this.columns = [...array]));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.updateColumns(event);
  }

  updateColumns(event: CdkDragDrop<string[]>) {
    const { previousIndex, currentIndex, item, container } = event;
    const columnId = item.element.nativeElement.dataset['id'];
    const columns = (Array.from(container.element.nativeElement.children) as HTMLElement[]).filter(
      (element) => element.tagName !== 'BUTTON',
    );
    const eventColumn = this.columns.find((column) => column.id === columnId) as BoardColumn;
    this.boardsService.reorderColumn({ ...eventColumn, order: 0 }, this.boardId);
    if (previousIndex < currentIndex) {
      for (let i = previousIndex + 1; i <= currentIndex; i += 1) {
        const editColumn = this.columns.find(
          (column) => column.id === (columns[i].dataset['id'] as string),
        ) as BoardColumn;
        this.boardsService.reorderColumn({ ...editColumn, order: i }, this.boardId);
      }
      this.boardsService.reorderColumn(
        { ...eventColumn, order: currentIndex + 1 },
        this.boardId,
        true,
      );
    } else {
      for (let i = previousIndex - 1; i >= currentIndex; i -= 1) {
        const editColumn = this.columns.find(
          (column) => column.id === (columns[i].dataset['id'] as string),
        ) as BoardColumn;
        this.boardsService.reorderColumn({ ...editColumn, order: i + 2 }, this.boardId);
      }
      this.boardsService.reorderColumn({ ...eventColumn, order: currentIndex + 1 }, this.boardId);
    }
  }

  onAddColumn() {
    const column = {
      title: 'New column',
      order: this.columns.length + 1,
    };
    this.boardsService.createColumn(column.title, column.order, this.boardId);
  }
}

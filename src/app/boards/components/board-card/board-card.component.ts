import { Component, Input } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/state/actions/boards.actions';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: BoardModel;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
  ) {}

  openBoard(event: Event, id: string) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'MAT-CARD') return;
    this.router.navigate(['main', 'board', id]);
  }

  deleteBoard() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure want to delete board '${this.board.title}'?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteBoard({ id: this.board.id }));
      }
    });
  }

  editBoard() {
    this.boardsService.boardData = this.board;
    this.boardsService.openBoardDialog('edit', this.board.id);
  }
}

import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { BoardModel } from '../../models/board.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/state/actions/boards.actions';
import { translateText, translateParamText  } from 'src/app/core/helpers/translate.function';

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
    protected readonly translate: TranslateService,
  ) {}

  openBoard(event: Event, id: string) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'MAT-CARD') return;
    this.router.navigate(['main', 'board', id]);
  }

  deleteBoard() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: translateParamText('BOARD_CARD.wantdeleteboard', this.translate, this.board.title),
        buttonText: {
          ok: translateText('BOARD_CARD.okbtntext', this.translate),
          cancel: translateText('BOARD_CARD.cancelbtntext', this.translate),
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteBoard({ id: this.board.id }));
      }
    });
  }
}

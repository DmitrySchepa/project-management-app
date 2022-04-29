import { Component, Input } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: BoardModel;

  constructor(private readonly router: Router) {}

  openBoard(event: Event, id: string) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'MAT-CARD') return;
    this.router.navigate(['main', 'board', id]);
  }

  deleteBoard(id: string) {
    console.log('delete board', id);
    // TODO call dialog, which gets type of elem (board, column, task), elem id
  }
}

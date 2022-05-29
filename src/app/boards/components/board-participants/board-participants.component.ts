import { Component } from '@angular/core';
import { Participant } from '../../models/board.model';

@Component({
  selector: 'app-board-participants',
  templateUrl: './board-participants.component.html',
  styleUrls: ['./board-participants.component.scss'],
})
export class BoardParticipantsComponent {
  participants?: Participant[] = [];

  fakeParticipant = { name: 'John', email: '@joejohn' };

  onDeleteParticipant = (ind: number) => this.participants?.splice(ind, 1);

  onAddParticipant = (patrticipant: Participant) => this.participants?.push(patrticipant);
}

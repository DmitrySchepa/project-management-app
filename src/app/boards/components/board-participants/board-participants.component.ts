import { Component, OnInit } from '@angular/core';
import { BoardModel, Participant } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-participants',
  templateUrl: './board-participants.component.html',
  styleUrls: ['./board-participants.component.scss'],
})
export class BoardParticipantsComponent implements OnInit {
  participants: Participant[] = [];

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.boadrsMock.forEach(
      (elem: BoardModel) => (this.participants = elem.participants),
    );
  }

  fakeParticipant = { name: 'John', email: '@joejohn' };

  onDeleteParticipant = (ind: number) => this.participants.splice(ind, 1);

  onAddParticipant = (patricipant: Participant) => this.participants.push(patricipant);
}

import { Component, OnInit } from '@angular/core';
import { BoardModel, Participant } from '../../models/board.model';
import { BoardsService } from '../../services/boards.service';
import { boardsMock } from 'src/mocks/board-model.mock';

@Component({
  selector: 'app-board-participants',
  templateUrl: './board-participants.component.html',
  styleUrls: ['./board-participants.component.scss'],
})
export class BoardParticipantsComponent implements OnInit {
  participants?: Participant[] = [];

  boards: BoardModel[] = boardsMock;

  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boards.forEach((elem: BoardModel) => (this.participants = elem.participants));
  }

  fakeParticipant = { name: 'John', email: '@joejohn' };

  onDeleteParticipant = (ind: number) => this.participants?.splice(ind, 1);

  onAddParticipant = (patricipant: Participant) => this.participants?.push(patricipant);
}

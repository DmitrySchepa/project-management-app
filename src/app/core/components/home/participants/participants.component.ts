import { Component, Input } from '@angular/core';
import { TeamModel } from '../../../../constants/our-team';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent {
  @Input() partisipant!: TeamModel;
}

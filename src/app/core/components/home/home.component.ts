import { Component } from '@angular/core';
import { Team, TeamModel } from '../../../constants/our-team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public team: TeamModel[] = [...Team];
}

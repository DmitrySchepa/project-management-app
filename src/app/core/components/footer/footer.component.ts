import { Component } from '@angular/core';
import { baseGithub, ourTeam } from '../../../constants/our-team';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  team = ourTeam;

  githubUrl = baseGithub;
}

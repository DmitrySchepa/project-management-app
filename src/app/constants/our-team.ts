export const baseGithub = 'https://github.com/';

export const ourTeam = ['dmitryschepa', 'nmakarevich', 'natein'];

export interface TeamModel {
  name: string;
  git: string;
  isTeamLead?: boolean;
  contribution: string[];
  img: string;
}

export const Team: TeamModel[] = [
  {
    name: 'Dzmitry Shchapiorka',
    git: 'dmitryschepa',
    isTeamLead: true,
    contribution: [
      'Current board',
      'Header and Sticky header',
      'Routing',
      'Welcome page',
      'NgRx,',
      'Create dialog'
    ],
    img: '../assets/images/dmitryschepa.jpg',
  },
  {
    name: 'Natalia Ein',
    git: 'natein',
    contribution: [
      'Footer',
      'Confirmation dialog',
      'Localization',
      'Backend deploy',
      'Global search',
      'Edit tasks dialog',
      'Custom feature'
    ],
    img: '../assets/images/natein.jpg',
  },
  {
    name: 'Nikolai Makarevich',
    git: 'nmakarevich',
    contribution: [ 
      'Project setup',
      'Boards',
      'Drag&drop between columns',
      'NgRx',
      'Not found page',
      'Auth service',
      'Login and Sign up',
      'Edit Pfofile',
      'Welcome page',
    ],
    img: 'https://avatars.githubusercontent.com/u/49314579?v=4',
  },
];

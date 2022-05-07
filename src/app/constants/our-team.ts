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
    contribution: [],
    img: '../assets/images/dmitryschepa.jpg',
  },
  {
    name: 'Natalia Ein',
    git: 'natein',
    contribution: [],
    img: '../assets/images/natein.jpg',
  },
  {
    name: 'Nikolai Makarevich',
    git: 'nmakarevich',
    contribution: [],
    img: 'https://avatars.githubusercontent.com/u/49314579?v=4',
  },
];

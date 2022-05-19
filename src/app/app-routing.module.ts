import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { SearchComponent } from './search/search.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { PomodoroItemComponent } from './pomodoro/components/pomodoro-item/pomodoro-item.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canLoad: [AuthGuard],
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent,
    canLoad: [AuthGuard],
  },  
  {
    path: 'welcome',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/404',
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

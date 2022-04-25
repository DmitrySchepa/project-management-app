import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomePageComponent } from './core/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'boards',
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'main',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

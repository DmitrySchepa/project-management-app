import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ParticipantsComponent } from './components/home/participants/participants.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
    NotFoundPageComponent,
    HomeComponent,
    ParticipantsComponent,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}

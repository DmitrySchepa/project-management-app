import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
    SignUpPageComponent,
    LogInPageComponent,
    EditProfilePageComponent,
    EditProfileComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}

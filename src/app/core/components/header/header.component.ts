import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService) {}

  checkAuth() {
    return this.authService.checkAuth();
  }

  logout() {
    this.authService.logout();
  }
}

import { Injectable } from '@angular/core';
import { LoginModel, UserModel } from '../models/auth.model';
import { ApiService } from '../../core/services/api.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apiService: ApiService, private readonly router: Router) {}

  public isAuth$ = new Subject<Boolean>();

  public userData!: UserModel;

  checkAuth() {
    const isAuth = !!localStorage.getItem('pwa-token');
    return this.isAuth$.pipe(startWith(isAuth));
  }

  login(login: LoginModel) {
    this.apiService.login(login).subscribe((userId) => {
      localStorage.setItem('pwa-token', this.apiService.token$.value);
      localStorage.setItem('pwa-user-id', userId);
      this.router.navigate(['main', 'boards']);
    });
  }

  signup(user: UserModel) {
    this.apiService
      .signup(user)
      .pipe(switchMap(() => this.apiService.login({ login: user.login, password: user.password })))
      .subscribe((userId) => {
        localStorage.setItem('pwa-token', this.apiService.token$.value);
        localStorage.setItem('pwa-user-id', userId);
        this.router.navigate(['main', 'boards']);
      });
  }

  getUser() {
    return this.apiService.getUser();
  }

  updateUser(user: UserModel) {
    this.apiService.updateUser(user).subscribe(() => this.router.navigate(['main', 'boards']));
  }

  logout() {
    localStorage.removeItem('pwa-token');
    localStorage.removeItem('pwa-user-id');
    this.apiService.token$.next('');
    this.router.navigate(['']);
  }

  deleteUser() {
    this.apiService.deleteUser().subscribe(() => this.logout());
  }
}

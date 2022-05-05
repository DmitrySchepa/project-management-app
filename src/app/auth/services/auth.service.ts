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

  public errorMessage!: string;

  checkAuth() {
    const isAuth = !!localStorage.getItem('pma-token');
    return this.isAuth$.pipe(startWith(isAuth));
  }

  login(login: LoginModel) {
    this.apiService.login(login).subscribe({
      next: (userId) => {
        localStorage.setItem('pma-token', this.apiService.token$.value);
        localStorage.setItem('pma-user-id', userId as string);
        this.errorMessage = '';
        this.router.navigate(['main', 'boards']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }

  signup(user: UserModel) {
    this.apiService
      .signup(user)
      .pipe(switchMap(() => this.apiService.login({ login: user.login, password: user.password })))
      .subscribe({
        next: (userId) => {
          localStorage.setItem('pma-token', this.apiService.token$.value);
          localStorage.setItem('pma-user-id', userId);
          this.errorMessage = '';
          this.router.navigate(['main', 'boards']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      });
  }

  getUser() {
    return this.apiService.getUser();
  }

  updateUser(user: UserModel) {
    this.apiService.updateUser(user).subscribe({
      next: () => this.router.navigate(['main', 'boards']),
      error: (error) => (this.errorMessage = error.error.message),
    });
  }

  logout() {
    localStorage.removeItem('pma-token');
    localStorage.removeItem('pma-user-id');
    this.apiService.token$.next('');
    this.router.navigate(['']);
  }

  deleteUser() {
    this.apiService.deleteUser().subscribe(() => this.logout());
  }
}

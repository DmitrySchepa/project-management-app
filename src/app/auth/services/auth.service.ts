import { Injectable } from '@angular/core';
import { LoginModel, UserModel } from '../models/auth.model';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, concatAll, find, map, pluck, startWith, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apiService: ApiService, private readonly router: Router) {}

  public isAuth$ = new Subject<Boolean>();

  public token = new BehaviorSubject<string>('');

  public userData!: UserModel;

  checkAuth() {
    const isAuth = !!localStorage.getItem('pwa-token');
    return this.isAuth$.pipe(startWith(isAuth));
  }

  login(login: LoginModel) {
    this.apiService
      .login(login)
      .pipe(
        pluck('token'),
        map((token) => this.token.next(token as string)),
        switchMap(() => this.apiService.getUsers()),
        concatAll(),
        find((user) => user.login === login.login),
        map((user) => user?.id as string),
      )
      .subscribe((user) => {
        localStorage.setItem('pwa-token', this.token.value);
        localStorage.setItem('pwa-user-id', user);
        this.router.navigate(['main', 'boards']);
      });
  }

  signup(user: UserModel) {
    this.apiService.signup(user).subscribe(() => this.router.navigate(['auth', 'log-in']));
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
    this.router.navigate(['']);
  }

  deleteUser() {
    this.apiService.deleteUser().subscribe(() => this.logout());
  }
}

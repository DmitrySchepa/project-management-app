import { Injectable } from '@angular/core';
import { LoginModel, UserModel } from '../models/auth.model';
import { ApiService } from '../../core/services/api.service';
import { startWith, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  deleteUser,
  getUserData,
  loginUser,
  logout,
  signupUser,
  updateUser,
} from '../../state/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public isAuth$ = new Subject<Boolean>();

  public userData!: UserModel;

  public errorMessage!: string;

  checkAuth() {
    const isAuth = !!localStorage.getItem('pma-token');
    return this.isAuth$.pipe(startWith(isAuth));
  }

  login(login: LoginModel) {
    this.store.dispatch(loginUser({ login }));
  }

  signup(user: UserModel) {
    this.store.dispatch(signupUser({ user }));
  }

  getUsers() {
    this.store.dispatch(getUserData());
  }

  updateUser(user: UserModel) {
    this.store.dispatch(updateUser({ user }));
  }

  logout() {
    localStorage.removeItem('pma-token');
    localStorage.removeItem('pma-user-id');
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }

  deleteUser() {
    this.store.dispatch(deleteUser());
  }
}

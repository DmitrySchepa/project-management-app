import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/services/api.service';
import {
  addUserData,
  deleteUser,
  getUserData,
  loginSuccess,
  loginUser,
  signupUser,
  updateUser,
} from '../actions/user.actions';
import { concatAll, find, map, switchMap, switchMapTo, tap } from 'rxjs';
import { UserDB } from '../../auth/models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupUser),
      switchMap(({ user }) => {
        localStorage.setItem('pma-passw', user.password);
        return this.apiService.signup(user);
      }),
      map((user) => {
        const { login } = user;
        const password = localStorage.getItem('pma-passw') as string;
        localStorage.removeItem('pma-passw');
        return loginUser({
          login: { login, password },
        });
      }),
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ login }) => {
        localStorage.setItem('pma-login', login.login);
        return this.apiService.login(login);
      }),
      map((token) => {
        localStorage.setItem('pma-token', token);
        this.authService.getUsers();
        return loginSuccess({ token });
      }),
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserData),
      switchMapTo(this.apiService.getUsers()),
      concatAll(),
      find((user) => {
        const login = localStorage.getItem('pma-login') as string;
        return user.login === login;
      }),
      map((user) => {
        localStorage.setItem('pma-user-id', user!.id);
        localStorage.removeItem('pma-login');
        this.router.navigate(['main', 'boards']);
        return addUserData({ userData: user as UserDB });
      }),
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      switchMapTo(this.apiService.getUser()),
      map((user) => addUserData({ userData: user })),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) => this.apiService.updateUser(user)),
      map((userData) => {
        const { login, name, id } = userData;
        return addUserData({ userData: { login, name, id } });
      }),
    );
  });

  deleteUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteUser),
        switchMapTo(this.apiService.deleteUser()),
        tap(() => this.authService.logout()),
      );
    },
    { dispatch: false },
  );
}

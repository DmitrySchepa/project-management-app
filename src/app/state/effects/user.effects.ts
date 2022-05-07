import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../core/services/api.service';
import {
  addUserData,
  deleteUser,
  getToken,
  loginSuccess,
  loginUser,
  requestError,
  signupUser,
  tokenOutdated,
  updateUser,
} from '../actions/user.actions';
import { catchError, concatAll, find, map, of, switchMap, switchMapTo, tap } from 'rxjs';
import { LoginModel, UserDB } from '../../auth/models/auth.model';
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
      map(({ user }) => {
        localStorage.setItem('pma-passw', user.password);
        return user;
      }),
      switchMap((user) =>
        this.apiService.signup(user).pipe(
          map((userData) => {
            const { login } = userData;
            const password = localStorage.getItem('pma-passw') as string;
            localStorage.removeItem('pma-passw');
            return loginUser({
              login: { login, password },
            });
          }),
          catchError((err) => of(requestError({ errorMessage: err.error.message }))),
        ),
      ),
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      map(({ login }) => {
        localStorage.setItem('pma-login', login.login);
        return login;
      }),
      switchMap((login: LoginModel) => {
        return this.apiService.login(login).pipe(
          map((token) => {
            return loginSuccess({ token });
          }),
          catchError((err) => of(requestError({ errorMessage: err.error.message }))),
        );
      }),
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
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
      ofType(getToken),
      switchMapTo(
        this.apiService.getUser().pipe(
          map((user) => addUserData({ userData: user })),
          catchError((err) => {
            if (err.error.statusCode === 401) return of(tokenOutdated());
            return of(err);
          }),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) =>
        this.apiService.updateUser(user).pipe(
          map((userData) => {
            const { login, name, id } = userData;
            return addUserData({ userData: { login, name, id } });
          }),
          catchError((err) => {
            if (err.error.statusCode === 401) return of(tokenOutdated());
            return of(err);
          }),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteUser),
        switchMapTo(
          this.apiService.deleteUser().pipe(
            catchError((err) => {
              if (err.error.statusCode === 401) return of(tokenOutdated());
              return of(err);
            }),
          ),
        ),
        tap(() => this.authService.logout()),
      );
    },
    { dispatch: false },
  );
}

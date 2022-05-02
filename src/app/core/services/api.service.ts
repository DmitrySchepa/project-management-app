import { Injectable } from '@angular/core';
import { LoginModel, UserDB, UserModel } from '../../auth/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, concatAll, find, map, Observable, pluck, switchMap } from 'rxjs';
import { BoardModel } from '../../boards/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public token$ = new BehaviorSubject<string>('');

  token() {
    return localStorage.getItem('pwa-token');
  }

  userId() {
    return localStorage.getItem('pwa-user-id');
  }

  login(login: LoginModel) {
    return this.http.post<LoginModel>('signin', login).pipe(
      pluck('token'),
      map((token) => this.token$.next(token as string)),
      switchMap(() => this.getUsers()),
      concatAll(),
      find((user) => user.login === login.login),
      map((user) => user?.id as string),
    );
  }

  signup(user: UserModel) {
    return this.http.post<UserModel>('signup', user);
  }

  getUsers(): Observable<UserDB[]> {
    return this.http.get<UserDB[]>('users');
  }

  getUser() {
    return this.http.get<UserDB>(`users/${this.userId()}`);
  }

  updateUser(user: UserModel) {
    return this.http.put<UserDB>(`users/${this.userId()}`, user);
  }

  deleteUser() {
    return this.http.delete(`users/${this.userId()}`);
  }

  getBoards() {
    return this.http.get<BoardModel[]>('/boards');
  }

  createBoard(title: string) {
    return this.http.post('boards', title);
  }

  deleteBoard(boardId: string) {
    return this.http.delete(`boards/${boardId}`);
  }
}

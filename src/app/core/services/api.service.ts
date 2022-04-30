import { Injectable } from '@angular/core';
import { LoginModel, UserDB, UserModel } from '../../auth/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardModel } from '../../boards/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  token() {
    return localStorage.getItem('pwa-token');
  }

  userId() {
    return localStorage.getItem('pwa-user-id');
  }

  login(login: LoginModel) {
    return this.http.post<LoginModel>('signin', login);
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

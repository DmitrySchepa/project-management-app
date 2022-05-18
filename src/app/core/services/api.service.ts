import { Injectable } from '@angular/core';
import { LoginModel, UserDB, UserModel } from '../../auth/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pluck } from 'rxjs';
import { BoardColumn, BoardModel, BoardData, BoardTask } from '../../boards/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public token$ = new BehaviorSubject<string>('');

  public isInfoAddModeOn$ = new BehaviorSubject<boolean>(false);

  token() {
    return localStorage.getItem('pma-token');
  }

  userId() {
    return localStorage.getItem('pma-user-id');
  }

  login(login: LoginModel): Observable<string> {
    return this.http.post<LoginModel>('signin', login).pipe(
      pluck('token'),
      map((token) => token as string),
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

  getBoards(): Observable<BoardModel[]> {
    return this.http.get<BoardModel[]>('boards');
  }

  createBoard(data: BoardData): Observable<any> {
    return this.http.post('boards', data);
  }

  editBoard(data: BoardData, boardId: string): Observable<BoardModel> {
    return this.http.put(`boards/${boardId}`, data) as Observable<BoardModel>;
  }

  deleteBoard(boardId: string): Observable<string> {
    return this.http.delete(`boards/${boardId}`) as Observable<string>;
  }

  getColumns(boardId: string): Observable<BoardColumn[]> {
    return this.http.get(`boards/${boardId}/columns`) as Observable<BoardColumn[]>;
  }

  getColumn(boardId: string, columnId: string) {
    return this.http.get(`boards/${boardId}/columns/${columnId}`);
  }

  createColumn(boardId: string, column: { title: string; order: number }) {
    return this.http.post(`boards/${boardId}/columns`, column) as Observable<BoardColumn>;
  }

  editColumn(boardId: string, column: { id: string; title: string; order: number }) {
    return this.http.put(`boards/${boardId}/columns/${column.id}`, {
      title: column.title,
      order: column.order,
    }) as Observable<BoardColumn>;
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete(`boards/${boardId}/columns/${columnId}`);
  }

  // updateColumn(boardId: string, columnId: string, data: string) {
  //   return this.http.put(`boards/${boardId}/columns/${columnId}`, data);
  // }

  getTasks(boardId: string, columnId: string): Observable<BoardTask[]> {
    return this.http.get(`boards/${boardId}/columns/${columnId}/tasks`) as Observable<BoardTask[]>;
  }

  // getTask(boardId: string, columnId: string, taskId: string) {
  //   return this.http.get(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  // }

  // updateTask(boardId: string, columnId: string, taskId: string, task: string) {
  //   return this.http.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task);
  // }

  // createTask(boardId: string, columnId: string, taskId: string, title: string) {
  //   return this.http.post(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, title);
  // }

  // deleteTask(boardId: string, columnId: string, taskId: string) {
  //   return this.http.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  // }
}

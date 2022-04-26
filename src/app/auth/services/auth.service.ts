import { Injectable } from '@angular/core';
import { LoginModel, UserModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(login: LoginModel) {}

  signup(user: UserModel) {}

  updateUser(user: UserModel) {}
}

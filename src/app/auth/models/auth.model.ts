export interface LoginModel {
  login: string;
  password: string;
}

export interface UserModel extends LoginModel {
  name: string;
}

export interface UserDB {
  id: string;
  name: string;
  login: string;
}

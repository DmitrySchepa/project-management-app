export interface LoginModel {
  login: string;
  password: string;
}

export interface UserModel extends LoginModel {
  name: string;
}

import { createReducer, on } from '@ngrx/store';
import { UserDB } from '../../auth/models/auth.model';
import { addUserData, loginSuccess, logout } from '../actions/user.actions';

export interface UserState {
  token: string;
  user: UserDB;
}

export const initialUserState: UserState = {
  token: '',
  user: {
    login: '',
    name: '',
    id: '',
  },
};

export const userReducer = createReducer(
  initialUserState,
  on(loginSuccess, (state, { token }): UserState => {
    return { ...state, token: token };
  }),
  on(addUserData, (state, { userData }): UserState => {
    return { ...state, user: userData };
  }),
  on(logout, (): UserState => {
    return initialUserState;
  }),
);

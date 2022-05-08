import { createReducer, on } from '@ngrx/store';
import { UserDB } from '../../auth/models/auth.model';
import {
  addUserData,
  clearError,
  getToken,
  loginSuccess,
  logout,
  requestError,
} from '../actions/user.actions';

export interface UserState {
  token: string;
  user: UserDB;
  error: string;
}

export const initialUserState: UserState = {
  token: '',
  user: {
    login: '',
    name: '',
    id: '',
  },
  error: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(loginSuccess, (state, { token }): UserState => {
    return { ...state, token: token };
  }),
  on(getToken, (state, { token }): UserState => {
    return { ...state, token: token };
  }),
  on(requestError, (state, { errorMessage }): UserState => {
    return { ...state, error: errorMessage };
  }),
  on(clearError, (state): UserState => {
    return { ...state, error: '' };
  }),
  on(addUserData, (state, { userData }): UserState => {
    return { ...state, user: userData };
  }),
  on(logout, (): UserState => {
    return initialUserState;
  }),
);

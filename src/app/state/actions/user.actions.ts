import { createAction, props } from '@ngrx/store';
import { LoginModel, UserDB, UserModel } from '../../auth/models/auth.model';

export const signupUser = createAction('[User] User signup', props<{ user: UserModel }>());
export const loginUser = createAction('[User] User login', props<{ login: LoginModel }>());
export const loginSuccess = createAction('[User] User login success', props<{ token: string }>());
export const getUserData = createAction('[User] Get user data');
export const addUserData = createAction('[User] Add user data', props<{ userData: UserDB }>());
export const updateUser = createAction('[User] Update user data', props<{ user: UserModel }>());
export const deleteUser = createAction('[User] Delete user');
export const logout = createAction('[User] Logout user');

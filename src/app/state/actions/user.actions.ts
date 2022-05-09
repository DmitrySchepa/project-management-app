import { createAction, props } from '@ngrx/store';
import { LoginModel, UserDB, UserModel } from '../../auth/models/auth.model';

export const signupUser = createAction('[User] User signup', props<{ user: UserModel }>());
export const loginUser = createAction('[User] User login', props<{ login: LoginModel }>());
export const loginSuccess = createAction('[User] User login success', props<{ token: string }>());
export const getToken = createAction('[User] Get token from LS', props<{ token: string }>());
export const addUserData = createAction('[User] Add user data', props<{ userData: UserDB }>());
export const updateUser = createAction('[User] Update user data', props<{ user: UserModel }>());
export const deleteUser = createAction('[User] Delete user');
export const requestError = createAction('[User] Request error', props<{ errorMessage: string }>());
export const clearError = createAction('[User] Clear error');
export const tokenOutdated = createAction('[User] Token is outdated');
export const logout = createAction('[User] Logout user');

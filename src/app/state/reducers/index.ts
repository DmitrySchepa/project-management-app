import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { userReducer, UserState } from './user.reducer';
import { BoardsReducer, BoardsState } from './boards.reducer';

export interface State {
  user: UserState;
  boards: BoardsState;
}

export const reducers: ActionReducerMap<State> = { user: userReducer, boards: BoardsReducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

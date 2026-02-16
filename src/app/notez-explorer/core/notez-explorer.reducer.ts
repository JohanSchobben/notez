import {Note} from '../../shared/models/note';
import {createReducer, on} from '@ngrx/store';
import * as NotezExplorerActions from './notez-explorer.actions';

export type NotezExplorerState = {
  notez: Note[];
}


const initialState: NotezExplorerState = {
  notez: [],
}

export const notezExplorerReducer = createReducer(
  initialState,
  on(NotezExplorerActions.loadNotezSuccess, (state, {notez}) => ({...state, notez})),
  on(NotezExplorerActions.storeNoteSuccess, (state, {note}) => ({...state, notez: [...state.notez, note]})),
  on(NotezExplorerActions.deleteNoteSuccess, (state, {id}) => ({...state, notez: state.notez.filter(note => note.id !== id)}))
)

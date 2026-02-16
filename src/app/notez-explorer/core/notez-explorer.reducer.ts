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
  on(NotezExplorerActions.createNote, (state, {title}) => ({...state, notez: [...state.notez, {title, id: state.notez.length + 1, lastOpenedAt: new Date(), createdAt: new Date()}]})),
  on(NotezExplorerActions.deleteNote, (state, {id}) => ({...state, notez: state.notez.filter(note => note.id !== id)}))
)

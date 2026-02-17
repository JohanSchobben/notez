import {createSelector} from '@ngrx/store';
import {AppState} from '../../../store/app-state';
import {NotezExplorerState} from './notez-explorer.reducer';

const selectorNotesExplorer = (state: AppState) => state.notezExplorer;

export const selectAllNotez = createSelector(
  selectorNotesExplorer,
  (notes: NotezExplorerState) => [...notes.notez].sort((a, b) => b.lastOpenedAt.getTime() - a.lastOpenedAt.getTime())
)

export const selectNotezById = (id: string) => createSelector(selectAllNotez, notez => notez.find(note => note.id === +id))

import {createAction, props} from '@ngrx/store';
import {Note} from '../../shared/models/note';

export const createNote = createAction(
  '[NotezExplorer] Create Note',
  props<{ title: string; description: string, tags: string[] }>()
);

export const deleteNote = createAction(
  '[NotezExplorer] Delete Note',
  props<{ id: number }>()
);


export const loadNotez = createAction('[NotezExplorer] Fetch All Notes')
export const loadNotezSuccess = createAction('[NotezExplorer] Fetch All Notes Success', props<{ notez: Note[] }>())

export const storeNote = createAction('[NotezExplorer] Store Note', props<{ note: Note }>());
export const storeNoteSuccess = createAction('[NotezExplorer] Store Note Success', props<{ note: Note }>());

export const deleteNoteSuccess = createAction('[NotezExplorer] Delete Note Success', props<{ id: number }>());

import {createAction, props} from '@ngrx/store';

export const createNote = createAction(
  '[NotezExplorer] Create Note',
  props<{ title: string }>()
)

export const deleteNote = createAction(
  '[NotezExplorer] Delete Note',
  props<{ id: number }>()
)

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {NotezExplorerDatabase} from './notez-explorer-database';
import {
  loadNotez,
  loadNotezSuccess,
  createNote,
  storeNoteSuccess,
  deleteNoteSuccess,
  deleteNote
} from './notez-explorer.actions';
import { exhaustMap } from "rxjs/operators";
import {map} from 'rxjs';
import {Note} from '../../shared/models/note';


export const loadAllNotesEffect = createEffect((
  actions$ = inject(Actions),
  dbService = inject(NotezExplorerDatabase)
) => {
  return actions$.pipe(
    ofType(loadNotez),
    exhaustMap(() => dbService.getAllNotez()),
    map((notez) => {
      return loadNotezSuccess({notez})
    })
  );
}, {functional: true});

export const saveEffect = createEffect((
  actions$ = inject(Actions),
  dbService = inject(NotezExplorerDatabase),
) => {
  return actions$.pipe(
    ofType(createNote),
    exhaustMap(({title}) => {
      const note: Note = {title, lastOpenedAt: new Date(), createdAt: new Date()};
      return dbService.saveNote(note);
    }),
    map((note: Note) => {
      return storeNoteSuccess({note})
    })
  );
}, {functional: true});

export const deleteEffect = createEffect((
  actions$ = inject(Actions),
  dbService = inject(NotezExplorerDatabase),
) => {
  return actions$.pipe(
    ofType(deleteNote),
    exhaustMap(({id}) => dbService.deleteNote(id).pipe(map(() => id))),
    map((id) => {
      return deleteNoteSuccess({id})
    })
  );
},  {functional: true})

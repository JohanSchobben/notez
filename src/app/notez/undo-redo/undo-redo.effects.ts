import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import * as notezActions from '../core/notez.actions';
import {Store} from '@ngrx/store';
import {map, withLatestFrom} from 'rxjs';
import * as undoRedoActions from './undo-redo.actions';
import {AppState} from '../../../store/app-state';

export const onWidgetBoardUpdate = createEffect((
  actions$ = inject(Actions),
  store$: Store<AppState> = inject(Store)
) => {
  return actions$
    .pipe(
      ofType(
        notezActions.addWidgetSuccess,
        notezActions.updateWidgetSuccess,
        notezActions.removeWidgetSuccess,
        notezActions.moveWidgetSuccess
      ),
      withLatestFrom(store$),
      map(([,state]) => state.widgets.widgets),
      map(widgets => undoRedoActions.update({widgets}))
    )
}, { functional: true });

export const clear = createEffect((
  actions$ = inject(Actions)
) => {
  return actions$
    .pipe(
      ofType(notezActions.loadWidgets),
      map(() => undoRedoActions.clear())
    )
}, { functional: true })

export const setInitial = createEffect((
  actions$ = inject(Actions)
) => {
  return actions$
    .pipe(
      ofType(notezActions.loadWidgetsSuccess),
      map(({notez}) => undoRedoActions.init({widgets: notez}))
    )
}, {functional: true})

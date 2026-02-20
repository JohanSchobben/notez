import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {WidgetDatabase} from './widget-database';
import * as notezActions from './notez.actions';
import {exhaustMap, map, withLatestFrom} from 'rxjs';
import {getAllWidgetsForNote} from './notez.selector';
import {Store} from '@ngrx/store';
import {concatLatestFrom} from '@ngrx/operators';

export const loadWidgetsForNote = createEffect((
  actions$ = inject(Actions),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.loadWidgets),
      exhaustMap(({noteId}) => dbService.getWidgetsForNote(noteId)),
      map((notez) => notezActions.loadWidgetsSuccess({notez}))
    )
}, {functional: true});

export const storeWidget = createEffect((
  actions$ = inject(Actions),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.addWidget),
      exhaustMap(({widget}) => dbService.addWidget(widget)),
      map((widget) => notezActions.addWidgetSuccess({widget})),
    )
}, {functional: true});

export const moveWidget= createEffect((
  actions$ = inject(Actions),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.moveWidget),
      exhaustMap(({widgetId, x, y}) => dbService.updateWidgetPosition(widgetId, x, y)),
      map((widget) => notezActions.updateWidgetSuccess({widget})),
    )
}, {functional: true});

export const putWidget = createEffect((
  actions$ = inject(Actions),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.updateWidget),
      exhaustMap(({widget}) => dbService.updateWidget(widget)),
      map((widget) => notezActions.updateWidgetSuccess({widget})),
    )
}, {functional: true});

export const deleteWidget= createEffect((
  actions$ = inject(Actions),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.removeWidget),
      exhaustMap(({widgetId}) => dbService.deleteWidget(widgetId).pipe(map(() => widgetId))),
      map((widgetId) => notezActions.removeWidgetSuccess({widgetId})),
    )
}, {functional: true});

export const moveBackEffect = createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.moveBack),
      concatLatestFrom(({widget}) => store.select(getAllWidgetsForNote(widget.noteId.toString()))),
      exhaustMap(([{widget}, widgets]) => {
        const elevations = widgets.map(w => w.elevation).sort((a,b) => a-b);
        const elevationIndex = elevations.indexOf(widget.elevation);
        const newElevation = elevations[Math.max(elevationIndex - 1, 0)] - 10;
        return dbService.updateElevation(widget.id!, newElevation);
      }),
      map((widget) => notezActions.updateWidgetSuccess({widget}))
    )
}, {functional: true});

export const moveForwardEffect =createEffect((
  actions$ = inject(Actions),
  store = inject(Store),
  dbService = inject(WidgetDatabase)
) => {
  return actions$
    .pipe(
      ofType(notezActions.moveForward),
      concatLatestFrom(({widget}) => store.select(getAllWidgetsForNote(widget.noteId.toString()))),
      exhaustMap(([{widget}, widgets]) => {
        const elevations = widgets.map(w => w.elevation).sort((a,b) => a-b);
        const elevationIndex = elevations.indexOf(widget.elevation);
        const newElevation = elevations[Math.min(elevationIndex + 1, widgets.length - 1)] + 10;
        return dbService.updateElevation(widget.id!, newElevation);
      }),
      map((widget) => notezActions.updateWidgetSuccess({widget}))
    )
}, {functional: true});

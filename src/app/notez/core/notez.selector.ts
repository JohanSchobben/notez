import {AppState} from '../../../store/app-state';
import {createSelector} from '@ngrx/store';
import {NotezState} from './notez.reducer';

const widgetsSelector = (state: AppState) => state.widgets;

export const getAllWidgetsForNote = (noteId: string) => createSelector(widgetsSelector, (notezState: NotezState) => notezState.widgets.filter(widget => widget.noteId === +noteId))
export const getNextElevation = createSelector(
  widgetsSelector,
  (notezState: NotezState) =>
    Math.min(
      Math.max(
        ...notezState.widgets.map(w => w.elevation), -10
      ) + 10,
      990
    )
)

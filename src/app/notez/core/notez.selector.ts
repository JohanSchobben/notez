import {AppState} from '../../../store/app-state';
import {createSelector} from '@ngrx/store';
import {Note} from '../../shared/models/note';
import {NotezState} from './notez.reducer';

const widgetsSelector = (state: AppState) => state.widgets;

export const getAllWidgetsForNote = (noteId: string) => createSelector(widgetsSelector, (notezState: NotezState) => notezState.widgets.filter(widget => widget.noteId === +noteId))

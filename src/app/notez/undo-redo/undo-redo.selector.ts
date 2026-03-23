import {AppState} from '../../../store/app-state';
import {createSelector} from '@ngrx/store';

const UndoRedoSelector = (state: AppState) => state.undoRedo;

export const getCurrentWidgets = createSelector(UndoRedoSelector, (undoRedo) => undoRedo.history.at(undoRedo.index))

export const canUndo = createSelector(UndoRedoSelector, (undoRedo) => undoRedo.index >= undoRedo.history.length * -1 && history.length > 0)

export const canRedo = createSelector(UndoRedoSelector, (undoRedo) => undoRedo.index !== -1)

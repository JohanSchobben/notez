import {createReducer, on} from '@ngrx/store';
import {clear, redo, undo, update, init} from './undo-redo.actions';
import {Widget} from '../core/models/widget';

export interface UndoRedoState {
  history: Widget[][];
  index: number;
}

const initialState: UndoRedoState = {
  history: [],
  index: -1,
}

export const undoRedoReducer = createReducer<UndoRedoState>(
  initialState,
  on(redo, (state) => ({...state, index: state.index + 1})),
  on(undo, (state) => ({...state, index: state.index - 1})),
  on(clear, () => ({history: [], index: -1,})),
  on(init, (state, props) => ({...state, history: [props.widgets], index: -1})),
  on(update, (state, props) => {
    const newWidget = structuredClone(props.widgets);
    if (state.index === -1) {
      return ({history: [...state.history, newWidget], index: -1});
    }
    const prevHistory = state.history.slice(0, state.index);
    return ({history: [...prevHistory, structuredClone(newWidget)].slice(0, state.index), index: -1});
  })
);

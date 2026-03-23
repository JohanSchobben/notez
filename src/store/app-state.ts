import {NotezExplorerState} from '../app/notez-explorer/core/notez-explorer.reducer';
import {NotezState} from '../app/notez/core/notez.reducer';
import {UndoRedoState} from '../app/notez/undo-redo/undo-redo.reducer';

export type AppState = {
  notezExplorer: NotezExplorerState;
  widgets: NotezState,
  undoRedo: UndoRedoState,
}

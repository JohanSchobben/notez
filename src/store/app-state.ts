import {NotezExplorerState} from '../app/notez-explorer/core/notez-explorer.reducer';
import {NotezState} from '../app/notez/core/notez.reducer';

export type AppState = {
  notezExplorer: NotezExplorerState;
  widgets: NotezState
}

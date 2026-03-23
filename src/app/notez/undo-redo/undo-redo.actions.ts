import {createAction, props} from '@ngrx/store';
import {Widget} from '../core/models/widget';

export const undo = createAction('[undo redo] undo');
export const redo = createAction('[undo redo] redo');
export const update = createAction('[undo redo] update', props<{widgets: Widget[]}>());
export const clear = createAction('[undo redo] clear');
export const init = createAction('[undo redo] init', props<{widgets: Widget[]}>());

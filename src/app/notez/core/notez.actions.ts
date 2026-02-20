import {createAction, props} from '@ngrx/store';
import {Widget} from './models/widget';


export const loadWidgets = createAction('[Notez] Fetch All Notes', props<{noteId: number}>());
export const loadWidgetsSuccess = createAction('[Notez] Fetch All Notes Success', props<{notez: Widget[]}>());
export const moveWidget = createAction('[Notez] Move Widget', props<{x: number, y: number, widgetId: number}>());
export const addWidget = createAction('[Notez] Add Widget', props<{widget: Widget}>());
export const addWidgetSuccess = createAction('[Notez] Add Widget Success', props<{widget: Widget}>());
export const updateWidget = createAction('[Notez] Update Widget', props<{widget: Widget}>());
export const updateWidgetSuccess = createAction('[Notez] Update Widget success', props<{widget: Widget}>());
export const removeWidget = createAction('[Notez] Remove Widget', props<{widgetId: number}>());
export const removeWidgetSuccess = createAction('[Notez] Remove Widget Success', props<{widgetId: number}>());

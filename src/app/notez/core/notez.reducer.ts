import {createReducer, on} from '@ngrx/store';
import {Widget} from './models/widget';
import * as NotezActions from './notez.actions';


export interface NotezState {
  widgets: Widget[]
}

const initialState: NotezState = {
  widgets: [],
}

export const notezReducer = createReducer(
  initialState,
  on(NotezActions.loadWidgetsSuccess, (state, {notez}) => ({...state, widgets: notez})),
  on(NotezActions.addWidgetSuccess, (state, {widget}) => ({...state, widgets: [...state.widgets, widget]})),
  on(NotezActions.updateWidgetSuccess, (state, {widget}) => ({...state, widgets: state.widgets.map(w => w.id === widget.id ? widget : w)})),
  on(NotezActions.removeWidgetSuccess, (state, {widgetId}) => ({...state, widgets: state.widgets.filter(w => w.id !== widgetId)})),
);

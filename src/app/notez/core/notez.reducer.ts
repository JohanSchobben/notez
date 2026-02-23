import {createReducer, on} from '@ngrx/store';
import {Widget} from './models/widget';
import * as NotezActions from './notez.actions';
import {addWidget} from './notez.actions';


export interface NotezState {
  widgets: Widget[];
  startPosition: {x: number, y: number};
}

const initialState: NotezState = {
  widgets: [],
  startPosition: {
    x: 100,
    y: 100,
  }
}

export const notezReducer = createReducer(
  initialState,
  on(NotezActions.loadWidgetsSuccess, (state, {notez}) => ({...state, widgets: notez})),
  on(NotezActions.addWidget, (state) => ({...state, startPosition: {x: state.startPosition.x + 50, y: state.startPosition.y + 50}})),
  on(NotezActions.addWidgetSuccess, (state, {widget}) => ({...state, widgets: [...state.widgets, widget]})),
  on(NotezActions.updateWidgetSuccess, (state, {widget}) => ({...state, widgets: state.widgets.map(w => w.id === widget.id ? structuredClone(widget) : w)})),
  on(NotezActions.removeWidgetSuccess, (state, {widgetId}) => ({...state, widgets: state.widgets.filter(w => w.id !== widgetId)})),
);

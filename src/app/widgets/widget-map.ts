import {WidgetType} from '../notez/core/models/widget';
import {WidgetComponent} from './widgetComponent';
import {InjectionToken, Type} from '@angular/core';
import {DebugWidget} from './debug-widget/debug-widget';
import {SimpleText} from './simple-text/simple-text';
import {TodoWidget} from './todo/todo-widget';

export type WidgetMap = Record<WidgetType, Type<WidgetComponent>>;

export const WIDGET_MAP: WidgetMap =  {
  'debug': DebugWidget,
  'simple-text': SimpleText,
  'todo': TodoWidget
}

export const WIDGET_MAP_ACCESSOR = new InjectionToken<Record<WidgetType, Type<WidgetComponent>>>('WIDGET_MAP');

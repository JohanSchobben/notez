import {Widget, WidgetType} from '../notez/core/models/widget';
import {InjectionToken} from '@angular/core';

export type WidgetDefaults = Partial<Record<WidgetType, Partial<Widget>>>;

export const WIDGET_DEFAULTS: WidgetDefaults = {
  'debug': {
    size: {
      width: 250,
      height: 250,
    }
  },
  'image': {
    size: {
      width: 300,
      height: 300,
    }
  },
  'simple-text': {
    size: {
      width: 250,
      height: 250,
    }
  },
  'todo': {
    size: {
      width: 250,
      height: 250,
    }
  }
};

export const WIDGET_DEFAULTS_ACCESSOR = new InjectionToken<WidgetDefaults>("WIDGET_MAP")

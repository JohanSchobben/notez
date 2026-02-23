import {OutputEmitterRef} from '@angular/core';
import {Widget} from '../notez/core/models/widget';

export interface WidgetComponent {
  focused: OutputEmitterRef<void>;
  blurred: OutputEmitterRef<void>;
  setWidget(widget: Widget): void;
}

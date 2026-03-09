import {Widget} from '../notez/core/models/widget';
import {InputSignal, OutputEmitterRef} from '@angular/core';

export interface WidgetComponent {
  readonly stateChanged: OutputEmitterRef<void>;
  readonly metaUpdated: OutputEmitterRef<any>;
  readonly hasFocus: boolean;
  readonly widget: InputSignal<Widget>
}

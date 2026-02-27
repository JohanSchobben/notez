import {Widget} from '../notez/core/models/widget';
import {Observable} from 'rxjs';

export interface WidgetComponent {
  readonly stateChanged$: Observable<void>;
  readonly metaUpdated$: Observable<any>;
  readonly hasFocus: boolean;
  setWidget(widget: Widget): void;
}

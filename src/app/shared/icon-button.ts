import {booleanAttribute, Component, input, numberAttribute} from '@angular/core';
import {Icon} from './icon';

@Component({
  selector: 'button[ntzIconButton]',
  imports: [
    Icon
  ],
  template: `
    <button [class.p-1]="dense()" [class.p-3]="!dense()" class="flext justify-center items-center disabled:text-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all active:scale-90">
      <ntz-icon [name]="name()" [size]="size()"/>
    </button>
  `
})
export class IconButton {
  name = input.required<string>();
  size = input(32, { transform: numberAttribute });
  dense = input(false, { transform: booleanAttribute });
}

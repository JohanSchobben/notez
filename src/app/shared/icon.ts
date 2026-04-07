import {Component, input, numberAttribute} from '@angular/core';

@Component({
  selector: 'ntz-icon',
  template: `<span [style.font-size.px]="size()" class="material-symbols-outlined align-middle">{{name()}}</span>`
})
export class Icon {
  name = input.required<string>();
  size = input(11, {transform: numberAttribute });
}

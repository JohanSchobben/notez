import {Component, input} from '@angular/core';

@Component({
  selector: 'ntz-label',
  templateUrl: './label.html',
})
export class Label {
  icon = input<string>();
  for = input.required<string>();
}

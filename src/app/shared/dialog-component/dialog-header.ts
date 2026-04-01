import {Component, input} from '@angular/core';

@Component({
  selector: 'ntz-dialog-header',
  template: `
    <div class="pt-4 px-4">
      <h2 class="text-3xl font-extrabold">{{heading()}}</h2>
    </div>
  `
})
export class DialogHeader {
  heading = input.required<string>();
}
